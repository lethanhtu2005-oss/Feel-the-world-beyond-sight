import { list, transaction } from "@/lib/store";
import { readJson } from "@/lib/validate";
import { secured, fail, json } from "@/lib/auth";
import { getBusiness } from "@/data/businesses";
import { cleanProfile, defaultProfile } from "@/lib/businessProfile";
export const dynamic = "force-dynamic";

// Business chỉ đọc/ghi hồ sơ của chính mình (businessId lấy từ phiên ở server); admin đọc được mọi hồ sơ.
function scope(req, user) {
  const asked = new URL(req.url).searchParams.get("business");
  const id = user.role === "admin" ? (asked || null) : user.businessId;
  if (!id || !getBusiness(id)) fail(400, "Không xác định được doanh nghiệp.");
  if (user.role !== "admin" && asked && asked !== id) fail(403, "Không có quyền xem doanh nghiệp này.");
  return id;
}
export const GET = secured(async (req, user) => {
  const id = scope(req, user);
  const saved = (await list("businessProfiles")).find(p => p.businessId === id);
  return json({ businessId: id, saved: !!saved, profile: saved ? saved.profile : defaultProfile(getBusiness(id)) });
}, ["business", "admin"]);

export const PUT = secured(async (req, user) => {
  const id = scope(req, user);
  const body = await readJson(req);
  return json(await transaction(db => {
    const row = db.businessProfiles.find(p => p.businessId === id);
    const { value, error } = cleanProfile(body, row?.profile || defaultProfile(getBusiness(id)));
    if (error) fail(400, error);
    value.updatedAt = new Date().toISOString();
    if (row) row.profile = value; else db.businessProfiles.push({ id: `bp_${id}`, businessId: id, ownerId: user.id, profile: value });
    return { businessId: id, saved: true, profile: value };
  }));
}, ["business"]);
