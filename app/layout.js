import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Script from "next/script"; // ✅ Import Script

export const metadata = {
  title: "Codegamy - Your Coding Ground",
  description: "Best Coding platform for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />

        {/* ✅ Chatbase Chatbot Script */}
        <Script id="chatbase-bot" strategy="lazyOnload">
          {`
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                window.chatbase = (...arguments) => {
                  if(!window.chatbase.q){ window.chatbase.q = []; }
                  window.chatbase.q.push(arguments);
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop) {
                    if(prop === "q"){ return target.q; }
                    return (...args) => target(prop, ...args);
                  }
                });
              }
              const onLoad = function(){
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "-MdXJHjn0EcpWO0QzzNuv"; // ✅ Replace with your bot ID if needed
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };
              if(document.readyState === "complete"){ onLoad(); }
              else { window.addEventListener("load", onLoad); }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}

