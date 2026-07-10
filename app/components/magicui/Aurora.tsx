export default function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* верх-лево, тёплый крем */}
      <div className="absolute -top-20 -left-20 md:-top-32 md:-left-32 w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full blur-2xl opacity-45 md:opacity-70 bg-gradient-to-br from-[#e6d4b3] to-[#f5e9d3] animate-aurora-1" />
      {/* верх-право, охра */}
      <div className="absolute top-1/4 -right-16 md:-right-40 w-[300px] h-[300px] md:w-[580px] md:h-[580px] rounded-full blur-2xl opacity-40 md:opacity-60 bg-gradient-to-br from-[#c7a678] to-[#e6d4b3] animate-aurora-2" />
      {/* центр-низ, глубокий brand */}
      <div className="absolute -bottom-24 md:-bottom-40 left-1/4 md:left-1/3 w-[280px] h-[280px] md:w-[560px] md:h-[560px] rounded-full blur-2xl opacity-35 md:opacity-55 bg-gradient-to-tr from-[#7a5b3c] to-[#c7a678] animate-aurora-3" />
      {/* лево-центр, светлый */}
      <div className="absolute top-1/2 -left-10 md:-left-20 w-[200px] h-[200px] md:w-[360px] md:h-[360px] rounded-full blur-2xl opacity-50 md:opacity-70 bg-gradient-to-br from-[#f5e9d3] to-[#e6d4b3] animate-aurora-4" />
      {/* право-низ, охра */}
      <div className="absolute bottom-1/4 -right-8 md:-right-20 w-[220px] h-[220px] md:w-[420px] md:h-[420px] rounded-full blur-2xl opacity-40 md:opacity-60 bg-gradient-to-tl from-[#c7a678] to-[#f5e9d3] animate-aurora-5" />
    </div>
  );
}
