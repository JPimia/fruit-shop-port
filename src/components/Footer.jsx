export function Footer() {
  return (
    <footer
      className="bg-[#F15C84] text-white text-sm py-6 px-4 text-center border-t border-gray-200 w-full mt-auto"
      style={{ height: "300px" }}
    >
      <img
        src="https://i.imgur.com/OO3bqPA.png"
        alt="Footer logo"
        style={{
          width: "240px",
          height: "auto",
          paddingTop: "12px",
          paddingBottom: "16px",
          margin: "0 auto",
        }}
      />
      <p>
        &copy; {new Date().getFullYear()} Hedelmäkauppa Oy. Kaikki oikeudet
        pidätetään.
      </p>
    </footer>
  );
}
