const ROW1 = [
  { quote: "KyberNode didn't just manage our ads; they rebuilt our entire growth engine.", name: 'Sarah Chen', role: 'CEO at Lumina Tech', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM5V8XxoGOE6XNPnvr9MkxyxMHYeUarYgKvpmHjm8c-fkD1EdgwBV1SMzIxBpVpMTPpDD8eVN7d_F-EF48issg-scBu87rAXMQA3QczODaYfWJ8VFKlpjMCsAo4CK68GftQAyytrhHCR-DAaIG6aQpFWWJDuG3dM7BcsxD1iLW2RjItACkDJ2L_xxEsXV2mHy-tRAXLrqk0wW0i0YEjDSpp249FYuulZd1dMZ58fE2d87nLk3FA5HFyxgCHED4KAxNmDmJncoDpXo' },
  { quote: 'The level of AI integration is staggering. They predicted our seasonal slump.', name: 'Marcus Rodriguez', role: 'Head of Marketing, VoltFlow', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmnqlDJp3EkauRQhD7de4qV4sFLMr3pbyzTsex_8suzNENHN4qYxCXiCbOufe1Y-oJohMbw2ZdBJQMhU6cZZ877DtxpRjXHaoZ7mfkCcc7id3aaCnWYFXQA0E-9C-wW9i-qh_SPbX09YjuOBdbA6yfEJbor8KEnlKipZI6sis3-xzK5DckzLvIVf29lI_yzVvVXFjt60cn5steSc94btWCYllpfyPFep5vwxkZPvwG0KLaiykxeo3wqqIndSo1Zbd5PyvYCeqh6IY' },
  { quote: 'Working with them felt like adding a powerhouse data team overnight.', name: 'Elena Petrova', role: 'Founder, Bloom & Co.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1d_g_uat-hEa9sjc7hnG8zfLfUY-y6pPzkOi-TaVqAr_hThWVDBOa-Zfbn-mjCZNxO4sUS7FXYZKCzAJXfAdzVQG61Q3i-uP-G9J3HiZRXR2VWK5UNLzdIfMBzP8jk1rG18RVWzG1gUqdqsrch4gW41cY7a0fFR1jDCr3W9JgV-u5qnN5bk0OLlndKBWEheoOmkegiYTJEtcYTcMLoXd5nNeC4oK0jSQVuYvDOPFX7mfXWZfjb5ZUC8vsxiQCEwa1hzoAyTbgFvY' },
  { quote: 'Immediate results. Our lead quality went through the roof within weeks.', name: 'David Park', role: 'CMO at Hyperion', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6S0PB5E3cXN0WENytnkxVfkdVQ2NG9qDW3nkQ4FJPaoXUburu28_Y1p7QArbVmNduGjcsd6ocLDE6oaYHTAeqnVqWHqHVtLtC5jp7lqBEuZJ0L-lsFEDf1rAnwt6kUszgZ0bIkSXb_mTTfZUXAiChRU7s3WCogazqkO5cQI7jyUneFhiqJShNgUAjoZ36K06UZ5SNs8VkX3fm77Mm2Oj5Imj-QLe24brRGUN3z_ELVjJ3OCckgsHFlhLqlcJOFwXfMnTE3M36czc' },
  { quote: 'The most professional performance team we have ever partnered with.', name: 'Lisa Wong', role: 'Growth at Nexa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7IPK__o4xX1AQrHRRalSpi2-OsBy3pAECmxw5go2PhZ2tt863tdvJLplMskYBnozGmW0UAQIXQ9of-oEbMFxuwU5Go1VFc9-3dFwXIFc179AHGhYBElgNJV-vwKylVMnbsgDRFfzXPlIVmBRs_KYrJs0gOeZhxPWDFMQGZhokyoNysYq8n6kl2tDSa8gWrXBbdVIo7K_RhTqX5gaNFLLT4w_VdxTaBgTKLKcBR_RT14OtTdVU2-Y3yMofhy-3FqKI4M2_A1hJPIk' },
]
const ROW2 = [
  { quote: 'Unmatched expertise in cross-channel scaling. A true game changer.', name: 'Tom Bradley', role: 'Operations at SwiftPay', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTH8O_O95DFpdhzXhxYMvVqDeq6Q39vyhgzcMCuQKAnJvOLjYi9fQqnh7CmvCEP2z5zPPcQaeNz_UbpgqdisnyUxb6xQWkShVDZ2afccLo4xEalo_cPqPKBS5AOC615jF7eYvvFjI60VF2KR4tz135LAvdAexnBuYKR7_FaleegSbqZhD-CiH4TNyfg68tVEDSjY3ck7iYfGZREVC2vVjvFL8irB5Q1C7y2Ka0zwS_U-Vq6x7TSz_P056c01gVReNVgubzNZ8Dtu8' },
  { quote: 'Their custom AI models gave us an unfair advantage in a crowded market.', name: 'Sophie Alvez', role: 'Founder of Zenon', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUCUqeRick6IxGgG4Gw7xjoG3VdffrC1qTvWqJq5BLA9VwOWHF9dTEoKhfayeV6pfMpp9HyTfnib4u_Qk1H9nO-GI6OWzLID6q_JKmaI9WjQWDeCWI5fsgHf1njBtfpBmUuwiY03CCXdrIdvgnGh2kHU9xJ9LTOMsj0VYKeFJi-VgpcJxDV1zY6vqq84wfGH_FUXTDCfOCM0VzzmHYkOnBtKoq59FH_pWlA2ENLsHrMaJlgQt-ZAGQDmnPz8hkus_krJlds2HtCqk' },
  { quote: 'Transparent reporting and exceptional ROAS. Highly recommended.', name: 'James Miller', role: 'CEO at CloudNine', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ObGKlu3GlkPZ5raEvO6ZJsTYhiR_RXGb6hzk4W6ORY8NmmTcCiENnawga8HHiOh_NT9GaeHvU9sC1TaCUf0wuFNoTMLgnLMVvOZp6cDLGOz3NjDDHwziom4FB3jDAD3iK0yAXBnxmmhDwtOKVyYkW9taIP9F1K7liByS4ObSJ55RzmFmCiAY535ck2S_amOONK-Du97xM_5C4P-q4Hh1Tq7IsedIOf0plCUyNhdCh3eWBNjcyUx4YtfRQZBM8B8tufnlB4NRv-0' },
  { quote: "They found opportunities we didn't even know existed in our data.", name: 'Rachel Green', role: 'VP Growth at Terra', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApjXPAhpTTz_FL77jvcMmqqfuV3S3GVD5eev5NWhh8ulwGqnZ5nBEALgrE95FeY_N5H7BnkJQvBUSoEYRdq1GQJ5ELYmQcMXlOzagfbEeR0GOsY9sWqeikk4DjJlC3BGK0ca8bn11Ovx0s39QprgeF8VQXRqiUBN_BjL6YmnJQorsxTRXYp-GWd9wHgmHzxHPIVwtJFDmCm_wQPdC3A1l930ApClT15xzUe4Hj4hR1KjKf4PVlz7k_N2hpaEqgGgB9jH81Ryta7WI' },
  { quote: 'KyberNode is the secret weapon every high-growth startup needs.', name: 'Chris Evans', role: 'Founder at StarkLab', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0XFTwE6HPL_FkiiRajnU6bmKrg-bFadr4gOUHtnVg5EtpiBcL8PujYtgPKy5q8Yw_oIr60LQimAbKYo6E3zwiyzL7BH0yPPEN7bzsd7JC6VGX7fLC5_ZFMh5C6qr62ehMWEy7jnp9xHagk2i9t6p7vKWIJMmruQZKZOQeuKY5mLpCxxKpIffFiVltguMHJy50GKsgbykUeQ3oAge_Daf3vcXMvQeWvEJnvSm0_cNbaNzO0ueq4IeQXtZ7ntvPYmNDbAHaLugjI4' },
]
const ROW3 = [
  { quote: 'Finally, an agency that actually understands the technical side of SEO.', name: 'Amanda Lee', role: 'CTO at FinGate', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Q7gk3a24CQbnVjbL_2HFkmIL0evkPFspuitUFMEGKPRSGq3HAEh4r9ergnrgNLAHwvOGl8Ga-aGwlXHpPDarKDzrtkKxKB76cpeJfnsujJ7sll5Qe2Lvb8Hzh5leQSTcqkF1ZwPdI5F3ro86bpNlVMoW6LuzSbueUdxeox3yAtx2gsZFNlfRYc6HCc2w_aqCyYwNAlZ6KptFG3aDlL9XUExh_yeWYt_XOtd2i4m7mCWN-JT88tmQycY0Kb9jqNomP2O5ynKGYA' },
  { quote: 'Our CPA dropped by 50% in the first two months. Unbelievable work.', name: 'Kevin Hart', role: 'Marketing at Peak Performance', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5quP8b93VNNp14Vm-g_4iUKfffEiYgs6uiWosZkfNVBsG61g8sf0kb1Xj4Rkvzvw68YJWuuLNXKJsnH2yidibePQDN9JRMU8biQiUblmAa0CR2_IDJRCRlzD6-jUX2r_Po1qluL9Hy6ujrINUj9P08pIkXqLNpkrVteQYgrQOtE40YWIa27f41ej5BiEkv0AnypIxzCdf2WrOiR84WGAM6aj0AIxSVuqVeSiACMNKaMXNcJI2KkheABDrB5Y33pBMLGuett2uUYs' },
  { quote: "The creative assets they produced converted better than anything we've used.", name: 'Nina Simone', role: 'Creative Director at Aura', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiQ73kp2iniPq7LO8pFPD-R2jZ6Fcdvup9xKJCuDhHcp2DTdALyr879mKP2lQ3-efhztUwf5jKM4pkKTnqBStzk78xZCS2s--DqvSKoExupYceM8ABW-sg3zOOAqovffxQIaGU4OLSByGwRiuaX7PvGe86ETFIUtH4w07nh3h-qCA1KojNS3Rrcdmu_UIxziujACOyobr2QpbA3NeVjqThorqBfJB6unASI2wuItHC0eeddLl7wFDKP6wgP9o1lJx4OlHP1oLdbC4' },
  { quote: 'They treat our budget as if it were their own. Total trust.', name: 'Paul Wright', role: 'Founder at Velocity', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqhfB4pZpRVONKOUWt_vG4eqMvsmsvHiWvvaxbl7i9qKJZqAmJQqT_IBYKqapq5nW6N_ssw-cm4pw1z_Ht8zXeQVqlu24nBlHLCJtuipEKuWLzLAnQstGfoHKvRdUdtw2PkrewADCjTio8xFu3C56wZX48GO5Lh0zodsJMp8wiCBXp_BIfElShzFMiXSzgn4POM-cSrrhdwOmqgotoDa8hv7v3SbrFrASggmMFNT7U4h3D8R--Xf6yHX1LtZoSBvr2JjHGqzT83mM' },
  { quote: 'A masterclass in performance marketing and data science.', name: 'Emily Blunt', role: 'Head of Digital at Forge', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrCRSVbWm8UxPClxnbt_cGIjD0u9R7LYB5DJFtu4y9fS_rWU1H4F6cAHNtec6d1p9k0IWRFS_R8nNnHuYqX4YhuMxBejsaHVehYpAyMgYYS1TjaOIyp-nwcagjsGHyBKHZudTWd-x6o86_mIZ6YHiT2t2-0pb__qBdAeslX_MbUK3g6jKOd6wc0z9GQvmQsKiwa-2Hs4HTaUOIVAker-DAcCmbccy5qT1CNzy6tXsirChGV6FltyDGnOOvkwaoshgRj-WdHgtpnnE' },
]

type TestimonialsProps = {
  inView: boolean
  reducedMotion: boolean
}

export function Testimonials({ inView, reducedMotion }: TestimonialsProps) {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-glow" aria-hidden />
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <h2 className="testimonials-title">Trusted by the World's Fastest Growing Brands</h2>
        </div>
        <div className="testimonials-rows" data-inview={inView} data-reduced={reducedMotion}>
          <div className="testimonials-row">
            <div className="testimonials-track">
              {[...ROW1, ...ROW1].map((q, i) => (
                <div key={`r1-${i}`} className="marquee-card">
                  <p className="marquee-quote">"{q.quote}"</p>
                  <div className="marquee-author">
                    <img src={q.img} alt={q.name} className="marquee-avatar" width={32} height={32} loading="lazy" />
                    <p className="marquee-name">{q.name}, {q.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonials-row">
            <div className="testimonials-track testimonials-track-reverse">
              {[...ROW2, ...ROW2].map((q, i) => (
                <div key={`r2-${i}`} className="marquee-card">
                  <p className="marquee-quote">"{q.quote}"</p>
                  <div className="marquee-author">
                    <img src={q.img} alt={q.name} className="marquee-avatar" width={32} height={32} loading="lazy" />
                    <p className="marquee-name">{q.name}, {q.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonials-row">
            <div className="testimonials-track">
              {[...ROW3, ...ROW3].map((q, i) => (
                <div key={`r3-${i}`} className="marquee-card">
                  <p className="marquee-quote">"{q.quote}"</p>
                  <div className="marquee-author">
                    <img src={q.img} alt={q.name} className="marquee-avatar" width={32} height={32} loading="lazy" />
                    <p className="marquee-name">{q.name}, {q.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
