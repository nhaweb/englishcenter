"use client"

import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, GraduationCap, Sparkles, Users } from "lucide-react"

const audiences = [
  {
    id: "preschool",
    label: "Mầm non",
    age: "4–6 tuổi",
    title: "Khơi mở tình yêu tiếng Anh từ những điều nhỏ nhất.",
    description: "Bé làm quen ngôn ngữ qua trò chơi, âm nhạc và những câu chuyện gần gũi — tự tin nghe, nói và khám phá mỗi ngày.",
    focus: ["Phonics qua trò chơi", "Phản xạ nghe – nói", "Tự tin thể hiện bản thân"],
    duration: "8–12 tuần / khóa",
    image: "photo-1503454537195-1dcabb73ffb9",
    badge: "HỌC MÀ CHƠI",
  },
  {
    id: "primary",
    label: "Tiểu học",
    age: "6–11 tuổi",
    title: "Xây nền vững chắc, nuôi dưỡng sự tự tin.",
    description: "Lộ trình theo độ tuổi phát triển phản xạ tự nhiên, củng cố đọc – viết và chuẩn bị Cambridge Starters, Movers, Flyers.",
    focus: ["Cambridge YLE", "Từ vựng & ngữ âm", "Đọc – viết nền tảng"],
    duration: "12–16 tuần / khóa",
    image: "photo-1509062522246-3755977927d7",
    badge: "CAMBRIDGE YLE",
  },
  {
    id: "middle-school",
    label: "THCS",
    age: "12–15 tuổi",
    title: "Vững kiến thức trên lớp, tự tin giao tiếp mỗi ngày.",
    description: "Củng cố ngữ pháp theo chương trình học, tăng phản xạ giao tiếp và xây nền tảng IELTS từ sớm.",
    focus: ["Ngữ pháp theo chương trình", "Giao tiếp tự nhiên", "Nền tảng IELTS"],
    duration: "12–24 tuần / khóa",
    image: "photo-1434030216411-0b793f4b4173",
    badge: "THCS · HỌC THUẬT",
  },
  {
    id: "high-school",
    label: "THPT & IELTS",
    age: "15–18 tuổi",
    title: "Chinh phục mục tiêu IELTS, sẵn sàng vào đại học.",
    description: "Chiến lược IELTS chuyên sâu, luyện tập theo mục tiêu band và chuẩn bị hành trang xét tuyển đại học, du học.",
    focus: ["Chiến lược IELTS chuyên sâu", "Mục tiêu band 6.5–8.5", "Xét tuyển & du học"],
    duration: "12–24 tuần / khóa",
    image: "photo-1434030216411-0b793f4b4173",
    badge: "THPT · IELTS",
  },
  {
    id: "adults",
    label: "Người đi làm",
    age: "Từ 18 tuổi",
    title: "Dùng tiếng Anh tự tin trong công việc thực tế.",
    description: "Thực hành thuyết trình, họp và giao tiếp với đối tác theo ngành nghề, lịch học linh hoạt cho người bận rộn.",
    focus: ["Business English", "Thuyết trình & họp", "Tình huống công sở"],
    duration: "8–12 tuần / khóa",
    image: "photo-1521737711867-e3b97375f902",
    badge: "ỨNG DỤNG NGAY",
  },
  {
    id: "corporate",
    label: "Doanh nghiệp",
    age: "Theo đội ngũ",
    title: "Đào tạo theo mục tiêu và văn hóa doanh nghiệp.",
    description: "Chương trình in-house được thiết kế sau khi đánh giá nhu cầu của đội ngũ, lĩnh vực hoạt động và mục tiêu phát triển.",
    focus: ["Đánh giá đầu vào", "Giáo trình theo ngành", "Báo cáo tiến độ định kỳ"],
    duration: "Thiết kế riêng",
    image: "photo-1524758631624-e2822e304c36",
    badge: "IN-HOUSE",
  },
]

const teachers = [
  { name: "James Wilson", role: "Giảng viên tiếng Anh · 9 năm kinh nghiệm", credential: "CELTA · UK", image: "photo-1500648767791-00dcc994a43e" },
  { name: "Sarah Mitchell", role: "Chuyên gia IELTS · 8 năm kinh nghiệm", credential: "DELTA · Australia", image: "photo-1551836022-d5d88e9218df" },
  { name: "David Chen", role: "Giảng viên giao tiếp · 7 năm kinh nghiệm", credential: "TESOL · Canada", image: "photo-1506794778202-cad84cf45f1d" },
]

const campuses = [
  { label: "LỚP HỌC TƯƠNG TÁC", title: "Không gian để mọi ý tưởng cất lời", image: "photo-1523240795612-9a054b0db644" },
  { label: "HỌC LIỆU HIỆN ĐẠI", title: "Tài nguyên học tập luôn trong tầm tay", image: "photo-1509062522246-3755977927d7" },
  { label: "CỘNG ĐỒNG HỌC TẬP", title: "Cùng nhau tiến bộ mỗi ngày", image: "photo-1529390079861-591de354faf5" },
]

export function Programs() {
  const [active, setActive] = useState(audiences[0].id)
  const selected = audiences.find((item) => item.id === active) ?? audiences[0]

  return (
    <section className="section programs-section" id="programs">
      <div className="shell">
        <div className="section-heading programs-heading">
          <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-dot"/> LỘ TRÌNH CHO TỪNG GIAI ĐOẠN</div><h2>Mỗi độ tuổi.<br/><span>Một cách vươn xa.</span></h2></div>
          <div className="heading-right"><p>Từ những từ tiếng Anh đầu tiên đến mục tiêu nghề nghiệp — chương trình được thiết kế theo nhu cầu thực tế của từng người học.</p><a className="text-link" href="#placement">Tìm lộ trình của bạn <ArrowRight size={15}/></a></div>
        </div>
        <div className="program-tabs" role="tablist" aria-label="Chọn nhóm chương trình">
          {audiences.map((item) => <button key={item.id} role="tab" aria-selected={active === item.id} aria-controls={`program-panel-${item.id}`} className={active === item.id ? "program-tab is-active" : "program-tab"} onClick={() => setActive(item.id)}><span>{item.label}</span><small>{item.age}</small></button>)}
        </div>
        <article className="program-feature" id={`program-panel-${selected.id}`} role="tabpanel" aria-label={`${selected.label}, ${selected.age}`}>
          <div className="program-feature-copy"><span className="program-kicker"><Sparkles size={14}/>{selected.badge}</span><span className="program-age">{selected.age}</span><h3>{selected.title}</h3><p>{selected.description}</p><ul>{selected.focus.map((item) => <li key={item}><Check size={15}/>{item}</li>)}</ul><div className="program-feature-footer"><span><BookOpen size={15}/>{selected.duration}</span><a className="button button-red" href="#placement">Xem chi tiết khóa học <ArrowRight size={15}/></a></div></div>
          <div className="program-feature-image" style={{ backgroundImage: `url(https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=1200&q=85)` }} role="img" aria-label={`Học viên chương trình ${selected.label}`}><span className="program-image-note"><GraduationCap size={18}/> Lộ trình chuẩn quốc tế</span></div>
        </article>
        <div className="program-card-grid">{audiences.filter((item) => item.id !== selected.id).map((item) => <a href="#placement" className="program-mini-card" key={item.id} onMouseEnter={() => setActive(item.id)}><span>{item.age}</span><strong>{item.label}</strong><small>{item.focus[0]} · {item.duration}</small><ArrowUpRight size={17}/></a>)}</div>
      </div>
    </section>
  )
}

export function Teachers() {
  return <section className="section teachers-section" id="teachers"><div className="shell"><div className="section-heading"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-dot"/> ĐỒNG HÀNH CÙNG CHUYÊN GIA</div><h2>Người truyền cảm hứng.<br/><span>Người mở cánh cửa.</span></h2></div><div className="heading-right"><p>Đội ngũ giáo viên quốc tế giàu kinh nghiệm, tận tâm theo sát mục tiêu của từng học viên.</p><a className="text-link" href="#placement">Gặp đội ngũ tư vấn <ArrowRight size={15}/></a></div></div><div className="teacher-grid">{teachers.map((teacher) => <article className="teacher-card" key={teacher.name}><div className="teacher-photo" style={{ backgroundImage: `url(https://images.unsplash.com/${teacher.image}?auto=format&fit=crop&w=800&q=85)` }} role="img" aria-label={`Chân dung ${teacher.name}`}><span><Users size={14}/>{teacher.credential}</span></div><div className="teacher-info"><h3>{teacher.name}</h3><p>{teacher.role}</p><a href="#placement" aria-label={`Tư vấn với ${teacher.name}`}><ArrowUpRight size={17}/></a></div></article>)}</div></div></section>
}

export function Campus() {
  return <section className="section campus-section" id="campus"><div className="shell"><div className="campus-heading"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-dot"/> KHÔNG GIAN HỌC TẬP</div><h2>Mỗi ngày đến lớp.<br/><span>Thêm một điều mới.</span></h2></div><p>Không gian hiện đại, thân thiện giúp người học thực hành tiếng Anh tự nhiên — trong và ngoài lớp học.</p></div><div className="campus-grid">{campuses.map((item, index) => <article key={item.label} className={`campus-card campus-card-${index + 1}`}><div className="campus-photo" style={{ backgroundImage: `url(https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=1000&q=85)` }} role="img" aria-label={item.title}/><div className="campus-caption"><span>{item.label}</span><h3>{item.title}</h3><ArrowUpRight size={18}/></div></article>)}</div></div></section>
}

export function RegistrationDialog({ buttonLabel = "Đăng ký tư vấn" }: { buttonLabel?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const details = [
      `Họ tên: ${values.get("name")}`,
      `Số điện thoại: ${values.get("phone")}`,
      `Email: ${values.get("email") || "Không cung cấp"}`,
      `Nhóm chương trình: ${values.get("audience")}`,
      `Ghi chú: ${values.get("note") || "Không có"}`,
    ].join("\\n")
    window.location.href = `mailto:hello@lingohaus.vn?subject=${encodeURIComponent("Đăng ký kiểm tra trình độ miễn phí")}&body=${encodeURIComponent(details)}`
  }

  return <>
    <button type="button" className="button button-red" onClick={() => setIsOpen(true)}>{buttonLabel}<ArrowRight size={15}/></button>
    <dialog ref={dialogRef} className="registration-dialog" aria-labelledby="registration-title" onClose={() => setIsOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false) }}>
      <button type="button" className="registration-close" aria-label="Đóng biểu mẫu" onClick={() => setIsOpen(false)}>×</button>
      <span className="registration-kicker">KIỂM TRA TRÌNH ĐỘ MIỄN PHÍ</span>
      <h2 id="registration-title">Tìm lộ trình phù hợp với bạn</h2>
      <p>Để lại thông tin, sau đó gửi yêu cầu qua ứng dụng email của bạn.</p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>Họ và tên<input name="name" autoComplete="name" required /></label>
        <label>Số điện thoại<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Email (không bắt buộc)<input name="email" type="email" autoComplete="email" /></label>
        <label>Bạn quan tâm chương trình nào?<select name="audience" defaultValue="Mầm non · 4–6 tuổi"><option>Mầm non · 4–6 tuổi</option><option>Tiểu học · 6–11 tuổi</option><option>THCS · 12–15 tuổi</option><option>THPT & IELTS · 15–18 tuổi</option><option>Người đi làm · Từ 18 tuổi</option><option>Doanh nghiệp · Theo đội ngũ</option></select></label>
        <label>Ghi chú (không bắt buộc)<textarea name="note" rows={3} /></label>
        <button type="submit" className="button button-red">Mở email để gửi yêu cầu <ArrowRight size={15}/></button>
      </form>
      <span className="registration-note">Biểu mẫu mở ứng dụng email mặc định; hiện chưa gửi trực tiếp đến hệ thống của trung tâm.</span>
    </dialog>
  </>
}
