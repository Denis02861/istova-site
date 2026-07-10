export default function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* верх-лево, тёплый крем — большой */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-2xl opacity-70 bg-gradient-to-br from-[#e6d4b3] to-[#f5e9d3] animate-aurora-1" />
      {/* верх-право, охра — среднее */}
      <div className="absolute top-1/4 -right-40 w-[580px] h-[580px] rounded-full blur-2xl opacity-60 bg-gradient-to-br from-[#c7a678] to-[#e6d4b3] animate-aurora-2" />
      {/* центр-низ, глубокий brand — большое */}
      <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full blur-2xl opacity-55 bg-gradient-to-tr from-[#7a5b3c] to-[#c7a678] animate-aurora-3" />
      {/* лево-центр, светлый — малое, быстрее */}
      <div className="absolute top-1/2 -left-20 w-[360px] h-[360px] rounded-full blur-2xl opacity-70 bg-gradient-to-br from-[#f5e9d3] to-[#e6d4b3] animate-aurora-4" />
      {/* право-низ, охра — среднее, разное направление */}
      <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full blur-2xl opacity-60 bg-gradient-to-tl from-[#c7a678] to-[#f5e9d3] animate-aurora-5" />
    </div>
  );
}
