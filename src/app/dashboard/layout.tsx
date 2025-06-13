export default function DashboardLayout({
  children,
  modal, // <-- must be defined
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal} {/* this will show the intercepted modal */}
    </>
  );
}
