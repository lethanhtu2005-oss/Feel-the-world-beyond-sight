"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { businesses } from "@/data/businesses";
import { guides } from "@/data/guides";
import EscrowLedgerView from "@/components/EscrowLedgerView";
import {
  UserIcon,
  CalendarIcon,
  StarIcon,
  AccessibleIcon,
  PhoneIcon,
  MapPinIcon,
  HeadphonesIcon,
  CheckIcon,
  SyncIcon,
  DownloadIcon,
  ShieldIcon,
  RadarIcon,
  AlertTriangleIcon,
  RadioTowerIcon,
  MedicalIcon,
  CarIcon,
  ConstructionIcon,
  TouchIcon,
  EditNoteIcon,
  LockIcon,
  CloudSyncIcon,
  LogOutIcon,
  LayersIcon,
  WalkingIcon,
  TuneIcon,
} from "@/components/Icons";

export default function AdminDashboard() {
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [requests, setRequests] = useState([]);

  // Filter state for ribbon
  const [timeRange, setTimeRange] = useState("today");
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Radar layer toggle state
  const [activeLayers, setActiveLayers] = useState({
    beacons: true,
    corridors: true,
    vehicles: true,
    obstacles: true,
  });

  // Selected radar marker
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Dispatcher interactive states
  const [radioActive, setRadioActive] = useState(false);
  const [dispatch115Sent, setDispatch115Sent] = useState(false);
  const [beaconChecked, setBeaconChecked] = useState(false);

  // Approvals interactive states
  const [approvedVolunteers, setApprovedVolunteers] = useState({});
  const [approvedPartners, setApprovedPartners] = useState({});

  // Quick Survey Modal
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [surveyVenue, setSurveyVenue] = useState("");

  useEffect(() => {
    Promise.all([api.listBookings(), api.listReviews(), api.listRequests()])
      .then(([b, r, q]) => {
        setBookings(b);
        setReviews(r);
        setRequests(q);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setToastMessage("Đã làm mới dữ liệu hiển thị Radar DEMO.");
      setTimeout(() => setToastMessage(""), 3500);
    }, 850);
  };

  const handleExport = () => {
    setToastMessage("Chức năng xuất báo cáo địa lý là mô phỏng; chưa tạo dữ liệu GeoJSON thực.");
    setTimeout(() => setToastMessage(""), 4000);
  };

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  const STATS = [
    { icon: UserIcon, num: businesses.length, label: "Doanh nghiệp", href: "/admin/businesses" },
    { icon: AccessibleIcon, num: guides.length, label: "Hướng dẫn viên", href: "/admin/consultation" },
    { icon: CalendarIcon, num: bookings.length, label: "Tổng đặt chỗ", href: "/admin/ride-demo" },
    { icon: StarIcon, num: reviews.length, label: "Đánh giá", href: "/admin/moderation" },
    { icon: AccessibleIcon, num: requests.length, label: "Yêu cầu hỗ trợ", href: "/admin/moderation" },
  ];

  return (
    <div className="min-h-screen space-y-6 pb-12">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#392219] px-4 py-3 text-sm font-semibold text-[#f8ae38] shadow-2xl transition-all border border-[#f8ae38]"
        >
          <CheckIcon size={20} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {error && (
        <div className="container-page pt-4">
          <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        </div>
      )}

      {/* 1. System Operational Ribbon */}
      <section className="border-b border-[#e9ded4] bg-[#fffaf4] px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <nav aria-label="Đường dẫn hệ thống" className="flex items-center gap-2 text-xs font-semibold text-[#786154]">
              <Link href="/" className="hover:text-[#f8ae38] transition-colors">
                Trang chủ
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-[#967766]">Quản trị hệ thống tiếp cận</span>
              <span aria-hidden="true">›</span>
              <span className="text-[#392219] font-bold">Hoàn Kiếm Accessibility Hub</span>
            </nav>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#392219] px-3 py-1 text-xs font-bold text-white shadow-sm">
                <ShieldIcon size={14} className="text-[#f8ae38]" />
                <span>Điều phối viên Nguyễn Quốc Tuấn</span>
                <span className="rounded bg-[#553326] px-1.5 py-0.2 text-[10px] text-[#f8d5ae]">#ADMIN-HK-01</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Radar DEMO</span>
                <span className="text-emerald-700 font-normal">| Dữ liệu mô phỏng</span>
              </span>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-white p-1 border border-[#e9ded4] shadow-sm">
              <button
                type="button"
                onClick={() => setTimeRange("today")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  timeRange === "today"
                    ? "bg-[#f8ae38] text-[#212529] shadow-sm"
                    : "text-[#625e58] hover:bg-[#fff7ea] hover:text-[#212529]"
                }`}
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => setTimeRange("7days")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  timeRange === "7days"
                    ? "bg-[#f8ae38] text-[#212529] shadow-sm"
                    : "text-[#625e58] hover:bg-[#fff7ea] hover:text-[#212529]"
                }`}
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setTimeRange("month")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  timeRange === "month"
                    ? "bg-[#f8ae38] text-[#212529] shadow-sm"
                    : "text-[#625e58] hover:bg-[#fff7ea] hover:text-[#212529]"
                }`}
              >
                Tháng này
              </button>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#e9ded4] bg-white px-3.5 py-1.5 text-xs font-bold text-[#212529] shadow-sm hover:border-[#f8ae38] hover:bg-[#fffaf4] transition-all"
            >
              <DownloadIcon size={16} className="text-[#d97706]" />
              <span>Xuất Báo Cáo</span>
            </button>

            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#f8ae38] px-3.5 py-1.5 text-xs font-bold text-[#212529] shadow-sm hover:bg-[#e09f2f] transition-all disabled:opacity-60"
            >
              <SyncIcon size={16} className={`text-[#212529] ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Đang đồng bộ..." : "Làm mới demo"}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 2. Four Vital KPI Metrics Grid */}
        <section aria-label="Các chỉ số then chốt">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* KPI Card 1: SOS Incidents */}
            <article className="relative overflow-hidden rounded-2xl border-t-4 border-t-red-600 bg-white p-5 shadow-sm border-x border-b border-[#ebdcd0] transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
                  Sự Cố Thực Địa
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangleIcon size={22} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-[#212529]">01</span>
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                  Đang xử lý khẩn cấp
                </span>
              </div>
              <div className="mt-3 -mx-5 -mb-5 flex items-center justify-between bg-[#fff5f5] px-5 py-3 text-xs text-[#625e58]">
                <span>
                  TB phản ứng: <strong className="text-[#212529]">1m 42s</strong>
                </span>
                <span className="font-semibold text-emerald-700">24 ca xử lý/tháng</span>
              </div>
            </article>

            {/* KPI Card 2: Sighted Guides */}
            <article className="relative overflow-hidden rounded-2xl border-t-4 border-t-[#f8ae38] bg-white p-5 shadow-sm border-x border-b border-[#ebdcd0] transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">
                  Lực Lượng Guide &amp; TNV
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#b45309]">
                  <AccessibleIcon size={22} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-[#212529]">
                  38<span className="text-xl font-normal text-[#786154]">/45</span>
                </span>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  84.4% Sẵn sàng
                </span>
              </div>
              <div className="mt-3 -mx-5 -mb-5 flex items-center justify-between bg-[#fffaf4] px-5 py-3 text-xs text-[#625e58]">
                <span>18 chuyến song hành</span>
                <span className="font-bold text-[#b45309]">36 Phố Phường</span>
              </div>
            </article>

            {/* KPI Card 3: Audited Cultural Venues */}
            <article className="relative overflow-hidden rounded-2xl border-t-4 border-t-emerald-600 bg-white p-5 shadow-sm border-x border-b border-[#ebdcd0] transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Di Tích Đã Kiểm Định
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <CheckIcon size={22} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-[#212529]">42</span>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  28 AAA Tiếp Cận
                </span>
              </div>
              <div className="mt-3 -mx-5 -mb-5 flex items-center justify-between bg-[#f0fdf4] px-5 py-3 text-xs text-[#625e58]">
                <span>11 Cần hỗ trợ phụ trợ</span>
                <span className="font-semibold text-amber-700">3 Điểm chờ duyệt</span>
              </div>
            </article>

            {/* KPI Card 4: Active Visitors */}
            <article className="relative overflow-hidden rounded-2xl border-t-4 border-t-[#392219] bg-white p-5 shadow-sm border-x border-b border-[#ebdcd0] transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#392219]">
                  Du Khách Đang Kết Nối
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#392219] text-[#f8ae38]">
                  <HeadphonesIcon size={20} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-[#212529]">156</span>
                <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold text-[#392219]">
                  Phiên DEMO
                </span>
              </div>
              <div className="mt-3 -mx-5 -mb-5 flex items-center justify-between bg-[#fbfaf8] px-5 py-3 text-xs text-[#625e58]">
                <span>82 Khiếm thị • 54 Low-vision</span>
                <span className="font-semibold text-[#212529]">20 Đồng hành</span>
              </div>
            </article>
          </div>
        </section>

        {/* Quick Portal Switcher */}
        <section aria-label="Cổng chức năng quản trị" className="rounded-2xl border border-[#ebdcd0] bg-white p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0e6dc] pb-3">
            <div>
              <h2 className="text-lg font-bold text-[#212529]">Cổng chức năng quản trị &amp; dữ liệu</h2>
              <p className="text-xs text-[#786154]">Liên kết phân hệ nghiệp vụ nội bộ của WayEcho</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffaf4] border border-[#f8ae38] px-3 py-1 text-xs font-bold text-[#b45309]">
              <span>Phân quyền Server bảo vệ</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Link
              href="/admin/consultation"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#392219] text-[#f8ae38]">
                <RadioTowerIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Tư vấn camera</span>
              <span className="text-[11px] text-[#786154]">Hỗ trợ trực tiếp</span>
            </Link>

            <Link
              href="/admin/businesses"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8ae38] text-[#212529]">
                <UserIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Xác minh đối tác</span>
              <span className="text-[11px] text-[#786154]">{businesses.length} đơn vị</span>
            </Link>

            <Link
              href="/admin/moderation"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <CheckIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Kiểm duyệt</span>
              <span className="text-[11px] text-[#786154]">{reviews.length} đánh giá</span>
            </Link>

            <Link
              href="/admin/ride-demo"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <CarIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Theo dõi xe DEMO</span>
              <span className="text-[11px] text-[#786154]">{bookings.length} chuyến</span>
            </Link>

            <Link
              href="/admin/inquiries"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                <CalendarIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Yêu cầu hợp tác</span>
              <span className="text-[11px] text-[#786154]">Form liên kết</span>
            </Link>

            <Link
              href="/admin/escrow"
              className="group flex flex-col rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3 transition-all hover:border-[#f8ae38] hover:bg-[#fff5e6] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white">
                <LockIcon size={16} />
              </span>
              <span className="mt-2 text-xs font-bold text-[#212529] group-hover:text-[#b45309]">Ký quỹ Escrow</span>
              <span className="text-[11px] text-[#786154]">Sổ cái bảo đảm</span>
            </Link>
          </div>
        </section>

        {/* 3. Main Administrative Operations Grid (8 cols / 4 cols) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN (8 Columns): Live Dispatch, Radar Map & Cultural Heritage Audits */}
          <div className="space-y-8 lg:col-span-8">
            {/* Live Incident Dispatcher Section */}
            <section
              aria-labelledby="live-sos-heading"
              className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full bg-red-600 animate-ping" />
                  <h2 id="live-sos-heading" className="text-xl font-bold text-[#212529]">
                    Giám Sát Khẩn Cấp &amp; Điều Phối SOS Thực Địa
                  </h2>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  1 Ca Ưu Tiên Cao Độ
                </span>
              </div>

              {/* Active Critical Incident Card */}
              <div className="rounded-2xl border border-red-200 bg-[#fff5f5] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      CẤP ĐỘ 1 - KHẨN CẤP
                    </span>
                    <span className="text-xs text-[#786154]">
                      Phát tín hiệu: <strong className="text-[#212529]">14:28:10 (2 phút trước)</strong>
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                    <MapPinIcon size={16} className="text-red-600" />
                    Ngã tư Hàng Chiếu - Thanh Hà
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    <AlertTriangleIcon size={26} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-base font-bold text-[#212529]">
                      Du khách Trần Minh Đức{" "}
                      <span className="text-xs font-normal text-[#786154]">
                        (#WE-HN-8924 • Khiếm thị hoàn toàn)
                      </span>
                    </p>
                    <p className="text-sm leading-relaxed text-[#49392e]">
                      Tín hiệu SOS từ gậy thông minh: Va chạm xe lôi cơ giới nhẹ trên vỉa hè tạm, ngã trượt chân, cần kiểm
                      tra y tế cơ bản và hỗ trợ định hướng lại hành trình về Ô Quan Chưởng.
                    </p>
                  </div>
                </div>

                {/* Dispatch Response Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl border border-red-100 bg-white p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8ae38] text-xs font-bold text-[#212529]">
                      MH
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#212529]">
                        Guide Pro Nguyễn Minh Hoàng đang tiếp cận
                      </p>
                      <p className="text-[11px] text-[#786154]">
                        Khoảng cách: 60 mét • Dự kiến có mặt trong 45 giây
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRadioActive(!radioActive);
                        setToastMessage(
                          !radioActive
                            ? "Đã kết nối Bộ Đàm Kênh 2 với Guide Hoàng!"
                            : "Đã ngắt phiên đàm thoại Kênh 2."
                        );
                      }}
                      className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                        radioActive
                          ? "bg-emerald-600 text-white"
                          : "bg-[#392219] text-white hover:bg-[#523326]"
                      }`}
                    >
                      <RadioTowerIcon size={16} />
                      <span>{radioActive ? "Kênh 2 (Đang mở)" : "Bộ Đàm Kênh 2"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMarker("sos");
                        setToastMessage("Đã định vị mục tiêu SOS #8924 trên bản đồ Radar!");
                      }}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-[#f8ae38] px-3 py-1.5 text-xs font-bold text-[#212529] hover:bg-[#e09f2f] transition-colors"
                    >
                      <RadarIcon size={16} />
                      <span>Mở Live Radar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDispatch115Sent(true);
                        setToastMessage("Đã chuyển tiếp thông tin toạ độ khẩn cấp tới Trực ban 115 Hoàn Kiếm!");
                      }}
                      className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                        dispatch115Sent
                          ? "bg-emerald-700 text-white"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      <MedicalIcon size={16} />
                      <span>{dispatch115Sent ? "115 Đã Nhận" : "Chuyển 115"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Incident (Navigation Assist) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-amber-200 bg-[#fffaf4] p-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-[#b45309]">
                    <AlertTriangleIcon size={20} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                        CẢNH BÁO LỆCH HƯỚNG
                      </span>
                      <span className="text-xs font-bold text-[#212529]">
                        Sarah Jenkins (Low Vision • #WE-UK-301)
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#786154]">
                      Lệch khỏi luồng gạch dẫn hướng tại Ngõ Mã Mây. Đã phát Beacon binaural 3D xung nhịp định vị tự động.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBeaconChecked(true);
                    setToastMessage("Tín hiệu Beacon 3D tại Ngõ Mã Mây phản hồi tốt (RSSI -42dBm)");
                  }}
                  className={`shrink-0 rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                    beaconChecked
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-[#e9ded4] bg-white text-[#212529] hover:bg-[#fff5e6]"
                  }`}
                >
                  {beaconChecked ? "✓ Tín Hiệu Bình Thường" : "Kiểm Tra Tín Hiệu Beacon"}
                </button>
              </div>
            </section>

            {/* Interactive Radar & Spatial GeoSPARQL Map Section */}
            <section
              aria-labelledby="radar-map-heading"
              className="rounded-2xl border border-[#ebdcd0] bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 id="radar-map-heading" className="text-xl font-bold text-[#212529]">
                    Bản Đồ Radar Tiếp Cận Lõi 36 Phố Phường
                  </h2>
                  <p className="text-xs text-[#786154]">
                    Giám sát chướng ngại vật thời gian thực, chốt cơ động và hành lang xúc giác
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> 4 Chốt Sẵn Sàng
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700">
                    <span className="h-2 w-2 rounded-full bg-red-600" /> 2 Điểm Thi Công
                  </span>
                </div>
              </div>

              {/* Layer Switches */}
              <div className="flex flex-wrap items-center gap-2 py-1">
                <button
                  type="button"
                  onClick={() => toggleLayer("beacons")}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeLayers.beacons
                      ? "bg-[#392219] text-[#f8ae38] shadow-sm"
                      : "bg-[#f5ece5] text-[#786154] hover:bg-[#ebdcd0]"
                  }`}
                >
                  <HeadphonesIcon size={14} />
                  <span>Lớp Beacon 3D (64 điểm)</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleLayer("corridors")}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeLayers.corridors
                      ? "bg-[#f8ae38] text-[#212529] shadow-sm"
                      : "bg-[#f5ece5] text-[#786154] hover:bg-[#ebdcd0]"
                  }`}
                >
                  <WalkingIcon size={14} />
                  <span>Hành Lang Không Vật Cản</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleLayer("vehicles")}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeLayers.vehicles
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-[#f5ece5] text-[#786154] hover:bg-[#ebdcd0]"
                  }`}
                >
                  <CarIcon size={14} />
                  <span>Xe Điện Chuyên Dụng</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleLayer("obstacles")}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeLayers.obstacles
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-[#f5ece5] text-[#786154] hover:bg-[#ebdcd0]"
                  }`}
                >
                  <ConstructionIcon size={14} />
                  <span>Vật Cản Tạm Thời</span>
                </button>
              </div>

              {/* Radar Canvas Container */}
              <div
                className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-[#1e293b] shadow-inner border border-[#334155]"
                aria-label="Radar thực địa Hoàn Kiếm"
              >
                {/* Background Map Visual */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRKbFS0FZ1tV-K-OCUDYl4oU6KORxCwO2Y3g1TWLeiwADW-Rbn9lwFrH8kNfZgCWug0VtOjo09fmsTHPx8szLAWwKMYxWM0_jlkwwodG26tUaH-qRcHqMf9fRu-PWLbKP0vcLxu-uz7BragIyZOkVdvPq2NPPIjKRf4lkN-cAVbh9Asu-7_3xDVKhIzFvExUDvhLjfM4bt4xWShO0xwMMhPADymzpIRejub1Ker6bx')",
                  }}
                />

                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Radar Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent pointer-events-none" />

                {/* Marker 1: Chốt Ô Quan Chưởng */}
                {activeLayers.corridors && (
                  <button
                    type="button"
                    onClick={() => setSelectedMarker("chot-oqc")}
                    className="absolute top-12 left-10 sm:left-16 group text-left cursor-pointer z-20 focus:outline-none"
                  >
                    <div className="flex items-center gap-2 rounded-xl border-l-4 border-l-emerald-400 bg-[#0f172a]/90 px-3 py-1.5 text-white backdrop-blur-md shadow-lg transition-transform hover:scale-105 border border-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Chốt Cứu Hộ Ô Quan Chưởng</span>
                        <span className="text-[10px] text-emerald-300">2 Guide trực • 1 Xe lăn điện</span>
                      </div>
                    </div>
                  </button>
                )}

                {/* Marker 2: SOS Hàng Chiếu */}
                <button
                  type="button"
                  onClick={() => setSelectedMarker("sos")}
                  className={`absolute top-36 left-1/3 sm:left-1/3 group text-left cursor-pointer z-30 focus:outline-none ${
                    selectedMarker === "sos" ? "ring-4 ring-red-400 rounded-xl" : "animate-bounce"
                  }`}
                >
                  <div className="flex items-center gap-2 rounded-xl bg-red-600 px-3.5 py-1.5 text-white shadow-xl transition-all">
                    <AlertTriangleIcon size={18} className="text-white" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">SOS #8924: Hàng Chiếu</span>
                      <span className="text-[10px] text-red-100">Guide Hoàng đang đến (60m)</span>
                    </div>
                  </div>
                </button>

                {/* Marker 3: Chốt Chợ Đồng Xuân */}
                {activeLayers.vehicles && (
                  <button
                    type="button"
                    onClick={() => setSelectedMarker("chot-dx")}
                    className="absolute top-20 right-8 sm:right-1/4 group text-left cursor-pointer z-20 focus:outline-none"
                  >
                    <div className="flex items-center gap-2 rounded-xl border-l-4 border-l-[#f8ae38] bg-[#0f172a]/90 px-3 py-1.5 text-white backdrop-blur-md shadow-lg transition-transform hover:scale-105 border border-slate-700">
                      <ShieldIcon size={16} className="text-[#f8ae38]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Chốt Chợ Đồng Xuân</span>
                        <span className="text-[10px] text-amber-200">3 TNV sẵn sàng</span>
                      </div>
                    </div>
                  </button>
                )}

                {/* Marker 4: Thi công Hàng Bạc */}
                {activeLayers.obstacles && (
                  <button
                    type="button"
                    onClick={() => setSelectedMarker("obstacle-hb")}
                    className="absolute bottom-16 right-10 sm:right-16 group text-left cursor-pointer z-20 focus:outline-none"
                  >
                    <div className="flex items-center gap-2 rounded-xl border-l-4 border-l-amber-500 bg-[#0f172a]/95 px-3 py-1.5 text-white backdrop-blur-md shadow-lg transition-transform hover:scale-105 border border-slate-700">
                      <ConstructionIcon size={18} className="text-amber-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Thi công vỉa hè Hàng Bạc</span>
                        <span className="text-[10px] text-amber-300">Chuyển luồng sang Hàng Bè</span>
                      </div>
                    </div>
                  </button>
                )}

                {/* Floating Map Legend */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-[#0f172a]/85 p-3 text-xs text-white backdrop-blur-md shadow-md space-y-1.5 max-w-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Trực quan hóa Thực địa
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span>Chốt cứu hộ cơ động sẵn sàng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f8ae38] inline-block" />
                    <span>Guide đang hỗ trợ du khách</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />
                    <span>Sự cố đang được giải quyết</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Cultural Heritage Accessibility Audit Management Table */}
            <section
              aria-labelledby="heritage-audit-heading"
              className="rounded-2xl border border-[#ebdcd0] bg-white p-6 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 id="heritage-audit-heading" className="text-xl font-bold text-[#212529]">
                    Kiểm Định Trợ Năng Di Tích &amp; Điểm Đến Phố Cổ
                  </h2>
                  <p className="text-xs text-[#786154]">
                    Dữ liệu chuẩn hóa theo WCAG 2.2 AAA &amp; QCVN 10:2014/BXD
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSurveyModal(true)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#392219] px-4 py-2 text-xs font-bold text-[#f8ae38] hover:bg-[#523326] transition-all shadow-sm"
                >
                  <MapPinIcon size={16} />
                  <span>+ Thêm Điểm Khảo Sát</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-xl border border-[#ebdcd0] bg-[#fffaf4]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebdcd0] bg-[#f5ece5] text-xs font-bold text-[#392219]">
                      <th className="py-3 px-4" scope="col">
                        Tên Di Tích / Địa Điểm
                      </th>
                      <th className="py-3 px-4" scope="col">
                        Trạng Thái Tiếp Cận
                      </th>
                      <th className="py-3 px-4" scope="col">
                        Âm Thanh 3D
                      </th>
                      <th className="py-3 px-4" scope="col">
                        Thẩm Định Viên
                      </th>
                      <th className="py-3 px-4 text-right" scope="col">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebdcd0] text-xs">
                    {/* Row 1 */}
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#212529]">Nhà Cổ 87 Mã Mây</div>
                        <div className="text-[11px] text-[#786154]">Phường Hàng Buồm • Cuối thế kỷ 19</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <CheckIcon size={12} /> Đạt Chuẩn WCAG 2.2 AAA
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                          <HeadphonesIcon size={14} /> 8 Bản ghi vòm
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#212529]">Hội Người Mù TP Hà Nội</div>
                        <div className="text-[11px] text-[#786154]">22/10/2024</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setToastMessage("Mở hồ sơ chỉnh sửa: Nhà Cổ 87 Mã Mây")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-[#b45309]"
                            title="Chỉnh sửa dữ liệu"
                          >
                            <EditNoteIcon size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToastMessage("Xem bản đồ xúc giác 3D: Nhà Cổ 87 Mã Mây")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-emerald-700"
                            title="Bản đồ xúc giác"
                          >
                            <TouchIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#212529]">Cửa Ô Quan Chưởng</div>
                        <div className="text-[11px] text-[#786154]">Phố Thanh Hà • Cổng thành cổ duy nhất</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <CheckIcon size={12} /> Hoàn Toàn Tiếp Cận
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                          <HeadphonesIcon size={14} /> 6 Bản ghi vòm
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#212529]">Viện Kiến Trúc Di Sản</div>
                        <div className="text-[11px] text-[#786154]">18/11/2024</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setToastMessage("Mở hồ sơ chỉnh sửa: Cửa Ô Quan Chưởng")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-[#b45309]"
                            title="Chỉnh sửa dữ liệu"
                          >
                            <EditNoteIcon size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToastMessage("Xem bản đồ xúc giác: Ô Quan Chưởng")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-emerald-700"
                            title="Bản đồ xúc giác"
                          >
                            <TouchIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#212529]">Đền Bạch Mã (Trấn Đông)</div>
                        <div className="text-[11px] text-[#786154]">76 Hàng Buồm • Tứ trấn Thăng Long</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                          <AlertTriangleIcon size={12} /> Bậc Ngưỡng Cửa (Cần Ram Dốc)
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                          <HeadphonesIcon size={14} /> 12 Bản ghi vòm
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#212529]">KTS. Trần Đăng Khoa</div>
                        <div className="text-[11px] text-[#786154]">05/12/2024</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setToastMessage("Mở hồ sơ chỉnh sửa: Đền Bạch Mã")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-[#b45309]"
                            title="Chỉnh sửa dữ liệu"
                          >
                            <EditNoteIcon size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToastMessage("Xem bản đồ xúc giác: Đền Bạch Mã")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-emerald-700"
                            title="Bản đồ xúc giác"
                          >
                            <TouchIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#212529]">Chợ Đồng Xuân</div>
                        <div className="text-[11px] text-[#786154]">Phố Đồng Xuân • Chợ đầu mối trung tâm</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
                          <WalkingIcon size={12} /> Chỉ Tiếp Cận Tầng 1
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                          <HeadphonesIcon size={14} /> 15 Beacon tín hiệu
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#212529]">BQL Phố Cổ &amp; WayEcho Lab</div>
                        <div className="text-[11px] text-[#786154]">12/01/2025</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setToastMessage("Mở hồ sơ chỉnh sửa: Chợ Đồng Xuân")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-[#b45309]"
                            title="Chỉnh sửa dữ liệu"
                          >
                            <EditNoteIcon size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToastMessage("Xem bản đồ xúc giác: Chợ Đồng Xuân")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-emerald-700"
                            title="Bản đồ xúc giác"
                          >
                            <TouchIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#212529]">Không Gian Phố Sách 19/12</div>
                        <div className="text-[11px] text-[#786154]">Phố 19/12, Hoàn Kiếm • Điểm hẹn văn hóa</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <CheckIcon size={12} /> Đạt Chuẩn WCAG 2.2 AAA
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                          <HeadphonesIcon size={14} /> Tích hợp sách nói NFC
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#212529]">Hội Người Mù TP Hà Nội</div>
                        <div className="text-[11px] text-[#786154]">14/02/2025</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setToastMessage("Mở hồ sơ chỉnh sửa: Phố Sách 19/12")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-[#b45309]"
                            title="Chỉnh sửa dữ liệu"
                          >
                            <EditNoteIcon size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToastMessage("Xem bản đồ xúc giác: Phố Sách 19/12")}
                            className="p-1.5 rounded-lg hover:bg-[#fff5e6] text-[#786154] hover:text-emerald-700"
                            title="Bản đồ xúc giác"
                          >
                            <TouchIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (4 Columns): Workforce Dispatch, Partner Approvals & Security Telemetry */}
          <div className="space-y-8 lg:col-span-4">
            {/* Active Sighted Guides Shift Roster */}
            <section
              aria-labelledby="active-guides-heading"
              className="rounded-2xl border border-[#ebdcd0] bg-white p-6 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 id="active-guides-heading" className="text-lg font-bold text-[#212529]">
                  Hướng Dẫn Viên Trực Chiến
                </h2>
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" title="Trực tuyến" />
              </div>
              <p className="text-xs text-[#786154]">
                Lực lượng chuyên nghiệp và tình nguyện viên có chứng chỉ hỗ trợ đa giác quan.
              </p>

              <div className="space-y-3">
                {/* Guide Item 1 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8ae38] font-bold text-[#212529] text-xs">
                        NH
                      </div>
                      <div>
                        <div className="font-bold text-[#212529] text-xs">Nguyễn Minh Hoàng</div>
                        <div className="text-[11px] text-[#b45309] font-semibold flex items-center gap-1">
                          <StarIcon size={12} className="text-[#f8ae38]" /> Guide Pro (VSL/ISL)
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                      Đang cứu hộ
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#786154]">
                    <span>Vị trí: Mã Mây / Hàng Chiếu</span>
                    <span className="font-semibold text-[#212529]">Ca 13h - 18h</span>
                  </div>
                </div>

                {/* Guide Item 2 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs">
                        TT
                      </div>
                      <div>
                        <div className="font-bold text-[#212529] text-xs">Lê Thu Trang</div>
                        <div className="text-[11px] text-[#786154]">TNV ĐH Hà Nội (Anh/Pháp)</div>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Sẵn sàng
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#786154]">
                    <span>Vị trí: Chợ Đồng Xuân</span>
                    <button
                      type="button"
                      onClick={() => setToastMessage("Đã mở điều phối nhiệm vụ cho TNV Lê Thu Trang")}
                      className="font-bold text-[#b45309] hover:underline"
                    >
                      Điều phối ngay
                    </button>
                  </div>
                </div>

                {/* Guide Item 3 */}
                <div className="rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#392219] font-bold text-[#f8ae38] text-xs">
                        HD
                      </div>
                      <div>
                        <div className="font-bold text-[#212529] text-xs">Vũ Hùng Dũng</div>
                        <div className="text-[11px] text-[#786154]">Tài xế Xe Điện Tiếp Cận #08</div>
                      </div>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      Đang chạy
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#786154]">
                    <span>Trả khách Ô Quan Chưởng</span>
                    <span className="font-semibold text-emerald-700">Pin 88%</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToastMessage("Danh sách toàn bộ 45 Hướng dẫn viên và TNV: đang trực 38, ngoại tuyến 7")}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#ebdcd0] bg-[#fffaf4] px-4 text-xs font-bold text-[#212529] hover:bg-[#fff5e6] transition-colors"
              >
                <UserIcon size={16} className="text-[#b45309]" />
                <span>Xem Toàn Bộ 45 Hướng Dẫn Viên</span>
              </button>
            </section>

            {/* Partner & Guide Pending Approvals */}
            <section
              aria-labelledby="approvals-heading"
              className="rounded-2xl border border-[#ebdcd0] bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 id="approvals-heading" className="text-lg font-bold text-[#212529]">
                  Hồ Sơ Chờ Phê Duyệt
                </h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f8ae38] text-xs font-bold text-[#212529]">
                  2
                </span>
              </div>

              {/* Pending Card 1 */}
              <div className="rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-4 space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
                    Tình Nguyện Viên Mới
                  </span>
                  <p className="text-xs font-bold text-[#212529]">Hoàng Thảo My (SV ĐHQG Hà Nội)</p>
                  <p className="text-[11px] text-[#786154]">
                    Hoàn thành chứng chỉ kỹ năng dẫn đường 12h với Hội Người mù Hoàn Kiếm.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {approvedVolunteers["my"] ? (
                    <span className="flex-1 rounded-lg bg-emerald-100 py-1.5 text-center text-xs font-bold text-emerald-800">
                      ✓ Đã Phê Duyệt
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setApprovedVolunteers((p) => ({ ...p, my: true }));
                          setToastMessage("Đã kích hoạt tài khoản TNV cho Hoàng Thảo My!");
                        }}
                        className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                      >
                        Duyệt &amp; Kích Hoạt
                      </button>
                      <button
                        type="button"
                        onClick={() => setToastMessage("Xem chi tiết hồ sơ chứng chỉ Hoàng Thảo My")}
                        className="rounded-lg border border-[#ebdcd0] bg-white px-3 py-2 text-xs font-semibold text-[#212529] hover:bg-[#f5ece5] transition-colors"
                      >
                        Hồ Sơ
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Pending Card 2 */}
              <div className="rounded-xl border border-[#ebdcd0] bg-[#fffaf4] p-4 space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d9488]">
                    Đối Tác Di Sản / Ẩm Thực
                  </span>
                  <p className="text-xs font-bold text-[#212529]">
                    Cà phê Giảng (Yên Phụ - Nguyễn Hữu Huân)
                  </p>
                  <p className="text-[11px] text-[#786154]">
                    Đề xuất lắp đặt thực đơn chữ nổi Braille và Beacon giới thiệu lịch sử cà phê trứng.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {approvedPartners["giang"] ? (
                    <span className="flex-1 rounded-lg bg-emerald-100 py-1.5 text-center text-xs font-bold text-emerald-800">
                      ✓ Đã Chấp Thuận &amp; Cấp Tem
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setApprovedPartners((p) => ({ ...p, giang: true }));
                          setToastMessage("Đã chấp thuận & cấp tem tiếp cận cho Cà phê Giảng!");
                        }}
                        className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                      >
                        Chấp Thuận &amp; Cấp Tem
                      </button>
                      <button
                        type="button"
                        onClick={() => setToastMessage("Lên lịch khảo sát hiện trường tại Cà phê Giảng")}
                        className="rounded-lg border border-[#ebdcd0] bg-white px-3 py-2 text-xs font-semibold text-[#212529] hover:bg-[#f5ece5] transition-colors"
                      >
                        Khảo Sát
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Compliance, Privacy & System Telemetry Log */}
            <section
              aria-labelledby="telemetry-heading"
              className="rounded-2xl bg-[#392219] p-6 text-white shadow-sm space-y-4 border border-[#523326]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldIcon size={20} className="text-[#f8ae38]" />
                  <h2 id="telemetry-heading" className="text-base font-bold text-white">
                    Bảo Vệ Quyền Riêng Tư &amp; Nhật Ký
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-[#f8d5ae]">NĐ 13/2023/NĐ-CP</span>
              </div>
              <p className="text-xs leading-relaxed text-[#e6d0c2]">
                Hệ thống mã hóa dữ liệu vị trí GPS định kỳ sau mỗi phiên dẫn đường thành công. Không lưu trữ thông tin
                nhận dạng cá nhân khiếm thị.
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between text-[#f0ded3]">
                  <span className="flex items-center gap-2">
                    <LockIcon size={14} className="text-emerald-400" />
                    Mã hóa Token GPS &amp; Audio
                  </span>
                  <span className="font-bold text-emerald-400">AES-256</span>
                </div>
                <div className="flex items-center justify-between text-[#f0ded3]">
                  <span className="flex items-center gap-2">
                    <CloudSyncIcon size={14} className="text-[#f8ae38]" />
                    Sao lưu dữ liệu di sản
                  </span>
                  <span className="text-[#e0c7b6]">03:00 Sáng nay</span>
                </div>
                <div className="flex items-center justify-between text-[#f0ded3]">
                  <span className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-emerald-400" />
                    Kiểm định Trợ Năng Định Kỳ
                  </span>
                  <span className="font-bold text-emerald-400">WCAG 2.2 AAA</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setToastMessage("Mở bảng điều chỉnh tham số bán kính radar và độ nhạy BLE...")}
                  className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#f8ae38] px-4 text-xs font-bold text-[#212529] hover:bg-[#e09f2f] transition-colors"
                >
                  <TuneIcon size={16} />
                  <span>Cài Đặt Tham Số Hệ Thống</span>
                </button>
                <Link
                  href="/api/auth/logout"
                  className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#26150f] px-4 text-xs font-bold text-[#ebdcd0] hover:text-white hover:bg-[#1a0e0a] transition-colors"
                >
                  <LogOutIcon size={16} />
                  <span>Đăng Xuất Phiên An Toàn</span>
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Existing Escrow Ledger View */}
        <section aria-label="Sổ cái ký quỹ Escrow" className="pt-4">
          <EscrowLedgerView role="admin" />
        </section>
      </div>

      {/* Quick Add Survey Modal */}
      {showSurveyModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="survey-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#ebdcd0] bg-white p-6 shadow-2xl space-y-4">
            <h3 id="survey-modal-title" className="text-lg font-bold text-[#212529]">
              Thêm Điểm Khảo Sát Tiếp Cận Di Tích
            </h3>
            <p className="text-xs text-[#786154]">
              Nhập thông tin địa điểm cần đoàn chuyên gia và người khiếm thị đến đo đạc WCAG 2.2 AAA &amp; QCVN 10:2014/BXD.
            </p>
            <div className="space-y-3">
              <div>
                <label htmlFor="venue-name" className="block text-xs font-bold text-[#212529]">
                  Tên Di Tích / Điểm Đến
                </label>
                <input
                  id="venue-name"
                  type="text"
                  value={surveyVenue}
                  onChange={(e) => setSurveyVenue(e.target.value)}
                  placeholder="Ví dụ: Đình Kim Ngân (42-44 Hàng Bạc)"
                  className="mt-1 w-full rounded-xl border border-[#ebdcd0] px-3.5 py-2.5 text-xs text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#f8ae38]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSurveyModal(false)}
                className="rounded-xl border border-[#ebdcd0] px-4 py-2 text-xs font-bold text-[#786154] hover:bg-[#f5ece5]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  if (surveyVenue.trim()) {
                    setToastMessage(`Đã tạo phiếu khảo sát cho: ${surveyVenue}`);
                    setSurveyVenue("");
                  }
                  setShowSurveyModal(false);
                }}
                className="rounded-xl bg-[#f8ae38] px-4 py-2 text-xs font-bold text-[#212529] hover:bg-[#e09f2f]"
              >
                Tạo Phiếu Khảo Sát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
