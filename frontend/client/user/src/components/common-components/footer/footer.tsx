import "./footer.scss";

import React from "react";
import { useHistory } from "react-router-dom";

import { UrlPaths } from "../../base-page-router";

export const Footer = (): JSX.Element => {
    const history = useHistory();

    const directToHomepage = () => {
        history.push(UrlPaths.HomePage);
    };

    const directToInstagram = () => {};

    const directToFacebook = () => {};

    const directToOwnerHomepage = () => {};

    const directToOwnerSignUpPage = () => {};

    const directToFAQPage = () => {};

    const directToCustomerCenterPage = () => {};

    const directToHelpPage = () => {};

    const directToEventPage = () => {};

    return (
        <div id="footer">
            <main id="footer-container">
                <div id="footer-container-row1">
                    <div id="footer-container-row1-column1">
                        <img src="Logo.png" alt="logo" id="footer-log" onClick={directToHomepage} />
                    </div>
                    <div id="footer-container-row1-column2">
                        <button id="footer-container-row1-column2-row1">커뮤니티</button>
                        <button id="footer-container-row1-column2-row2" onClick={directToInstagram}>
                            Instagram
                        </button>
                        <button id="footer-container-row1-column2-row3" onClick={directToFacebook}>
                            Facebook
                        </button>
                    </div>
                    <div id="footer-container-row1-column3">
                        <button id="footer-container-row1-column3-row1">호스트되기</button>
                        <button
                            id="footer-container-row1-column3-row2"
                            onClick={directToOwnerHomepage}
                        >
                            사업자 페이지
                        </button>
                        <button
                            id="footer-container-row1-column3-row3"
                            onClick={directToOwnerSignUpPage}
                        >
                            사업장 등록
                        </button>
                        <button
                            id="footer-container-row1-column3-row4"
                            onClick={directToOwnerHomepage}
                        >
                            사업자 혜택
                        </button>
                    </div>
                    <div id="footer-container-row1-column4">
                        <button id="footer-container-row1-column4-row1">기타</button>
                        <button id="footer-container-row1-column4-row2" onClick={directToFAQPage}>
                            FAQ
                        </button>
                        <button
                            id="footer-container-row1-column4-row3"
                            onClick={directToCustomerCenterPage}
                        >
                            고객센터
                        </button>
                        <button id="footer-container-row1-column4-row4" onClick={directToHelpPage}>
                            도움말
                        </button>
                        <button id="footer-container-row1-column4-row5" onClick={directToEventPage}>
                            EVENT
                        </button>
                    </div>
                </div>
                <hr id="footer-container-row2" />
                <div id="footer-container-row3">
                    <span id="copyright-title-reserved-text">
                        © 2021 Spaceshuttle, Inc. All rights reserved
                    </span>
                </div>
            </main>
        </div>
    );
};
