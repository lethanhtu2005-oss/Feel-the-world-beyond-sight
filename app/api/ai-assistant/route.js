import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { question, image } = await request.json();
    if (
      typeof question !== "string" ||
      question.length > 1500 ||
      (image && (typeof image !== "string" || image.length > 2500000 || !image.startsWith("data:image/jpeg;base64,")))
    ) {
      return NextResponse.json({ error: "Dữ liệu yêu cầu không hợp lệ." }, { status: 400 });
    }

    if (/(chỉ đường|dẫn đường|đường nào|đi hướng nào|rẽ (trái|phải)|băng qua|qua đường|có an toàn|tránh (xe|vật cản)|đi tiếp|đi thẳng|lối nào)/i.test(question || "")) {
      return NextResponse.json({
        answer: "Tôi chỉ mô tả cảnh, không hướng dẫn di chuyển hay bảo đảm an toàn. Nếu cần đi, hãy dùng gậy để dò đường và nhờ người hỗ trợ phù hợp. Bạn có muốn kết nối với tư vấn viên WayEcho để hỏi thông tin lộ trình không?",
        consultantSuggested: true
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const instructions = "Bạn là trợ lý WayEcho cho người khiếm thị tại Hà Nội. CHỈ trả lời bằng TIẾNG VIỆT tự nhiên. Mô tả đúng những gì nhìn thấy trong ảnh chụp, không tự nhận định chính xác người đang ở địa điểm nào chỉ từ cảnh chung. Nếu không chắc, nói rõ. TUYỆT ĐỐI KHÔNG CHỈ ĐƯỜNG: không chỉ rẽ, đi thẳng, di chuyển theo hướng nào, tránh vật cản, băng đường hoặc khẳng định lối an toàn dù khách yêu cầu. Chỉ mô tả sự vật và bố cục cảnh, nêu rõ chưa chắc chắn. Nếu khách muốn đi đâu, nói: Nếu bạn đi, hãy dùng gậy để dò đường; mô tả của tôi có thể sai. Hỏi khách có muốn kết nối tư vấn viên để tìm hiểu lộ trình hay nhờ hỗ trợ không. Không khẳng định có tư vấn viên trực tuyến khi chưa có kết nối. Trả lời ngắn gọn và hữu ích.";

    // 1. Try Gemini if configured
    if (geminiKey) {
      try {
        const contents = [];
        const parts = [{ text: `${instructions}\n\nYêu cầu: ${question || "Mô tả những gì nhìn thấy trong ảnh."}` }];
        if (image && image.includes("base64,")) {
          const base64Data = image.split("base64,")[1];
          parts.push({
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data
            }
          });
        }
        contents.push({ role: "user", parts });

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents })
        });

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const text = gData.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ").trim();
          if (text) {
            return NextResponse.json({ answer: text });
          }
        }
      } catch {
        // Continue to fallback
      }
    }

    // 2. Try OpenAI if configured
    if (openAiKey) {
      try {
        const parts = [{ type: "input_text", text: question || "Mô tả những gì nhìn thấy trong ảnh." }];
        if (image) parts.push({ type: "input_image", image_url: image });
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: { Authorization: `Bearer ${openAiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.WAYECHO_VISION_MODEL || "gpt-4.1-mini",
            instructions,
            input: [{ role: "user", content: parts }],
            max_output_tokens: 350
          })
        });
        if (response.ok) {
          const data = await response.json();
          const answer = (data.output || []).flatMap(o => o.content || []).filter(c => c.type === "output_text").map(c => c.text).join(" ").trim();
          if (answer) return NextResponse.json({ answer });
        }
      } catch {
        // Continue to fallback
      }
    }

    // 3. Built-in Vietnamese accessibility scene descriptor fallback (no 503, no API key blocker)
    const localAnswer = image
      ? "[DEMO] Chưa kết nối dịch vụ AI nhận diện hình ảnh nên WayEcho chưa thể mô tả ảnh bạn vừa chụp, và sẽ không đoán nội dung để tránh sai lệch. Hãy dùng gậy dò đường, hỏi người xung quanh, hoặc nhờ người đồng hành qua mục Guide."
      : "[DEMO] Chưa kết nối dịch vụ AI nên WayEcho chưa trả lời được câu hỏi này. Bạn có thể gửi yêu cầu cho tư vấn viên hoặc xem thông tin tiếp cận của từng điểm đến trong mục Dịch vụ.";

    return NextResponse.json({
      answer: localAnswer,
      demoMode: true,
      consultantSuggested: true
    });
  } catch {
    return NextResponse.json({ error: "Không thể xử lý yêu cầu này." }, { status: 500 });
  }
}
