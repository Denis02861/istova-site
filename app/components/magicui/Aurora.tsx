export default function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[540px] h-[540px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-[#e6d4b3] to-[#f5e9d3] animate-aurora-1" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-[#c7a678] to-[#e6d4b3] animate-aurora-2" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-[#7a5b3c] to-[#c7a678] animate-aurora-3" />
    </div>
  );
}
