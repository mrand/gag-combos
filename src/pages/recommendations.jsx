import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import Header from "~/features/ui/header";
import { Dashboard } from "~/features/recommendations";
import Footer from "~/features/ui/footer";


export default function Recommendations() {
  const pageSize = useContext(PageSizeContext);

  return (
    <div id="page" className="recommendations custom-scrollbar with-grid-bg">
      <Header />
      <Dashboard pageSize={pageSize} />
      {/* Dashboard Special Case - no footer on mobile */}
      {pageSize==="mobile" ? null : <Footer />}
    </div>
  );
}
