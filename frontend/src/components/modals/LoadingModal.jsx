export default function LoadingModal() {
  return (
    <div className="fixed inset-y-0 left-[10%] md:left-[25%] lg:left-[15%] flex items-center justify-center h-full bg-black/10 right-0">
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 bg-black rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
