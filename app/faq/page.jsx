import styles from "./faq.module.css";
import { frequentlyAskedQuestions } from "../faq-data";

export const metadata = {
  title: "Câu hỏi thường gặp",
  description: "Giải đáp 20 câu hỏi về khả năng tiếp cận, đặt dịch vụ, trợ lý camera AI, quyền riêng tư và an toàn khi sử dụng WayEcho.",
};

export default function FaqPage() {
  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>WAYECHO · HỖ TRỢ NGƯỜI DÙNG</p>
          <h1>Câu hỏi thường gặp</h1>
          <p className={styles.lead}>Giải đáp những băn khoăn khi khám phá điểm đến, sử dụng trợ năng, đặt dịch vụ và nhận hỗ trợ trên WayEcho.</p>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.context}>WayEcho hiện là bản mô phỏng (prototype). Thông tin dịch vụ, nhân sự, giá và dữ liệu tiếp cận chưa phải cam kết vận hành thực tế. Chọn từng câu hỏi để đọc câu trả lời.</p>
        <div className={styles.list} aria-label="Danh sách 20 câu hỏi thường gặp">
          {frequentlyAskedQuestions.map((item, i) => (
            <details className={styles.item} key={i}>
              <summary className={styles.question}>
                <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.chevron} aria-hidden="true" />
              </summary>
              <div className={styles.answer}><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
        <p className={styles.closing}>WayEcho – Feel the world beyond sight. Cảm nhận thế giới vượt ngoài tầm nhìn.</p>
      </div>
    </article>
  );
}
