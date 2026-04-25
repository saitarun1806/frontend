// app/layout.js

export const metadata = {
  title: "Student Result Portal",
  description: "View student results"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
