import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';

function TermsConditionPage() {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <section id="terms-and-conditions" className="py-5">
          <div className="container section-content">
            <div className="row">
              <div className="col">
                <h2>Terms and Conditions</h2>
                Conan.io website offers this Web site, including all information,
                software, products and services available from this Web site or
                offered as part of or in conjunction with this Web site (the “Web
                site”), to you, the user, conditioned upon your acceptance of all of
                the terms, conditions, policies and notices stated here. Conan.io
                Website reserves the right to make changes to these
                <b>Terms and Conditions</b>immediately by posting the changed Terms
                and Conditions in this location.Your continued use of the Web site
                constitutes your agreement to all such terms, conditions and
                notices, and any changes to the Terms and Conditions made by
                Conan.io Website.The term ‘conan.io’ or ‘us’ or ‘we’ refers to the
                owner of the website. The term ‘you’ refers to the user or viewer of
                our website.The use of this website is subject to the following
                terms of use:Use the website at your own risk. This website is
                provided to you “as is,” without warranty of any kind either express
                or implied. Neither Conan.io Website nor its employees, agents,
                third-party information providers, merchants, licensors or the like
                warrant that the Web site or its operation will be accurate,
                reliable, uninterrupted or error-free. No agent or representative
                has the authority to create any warranty regarding the Web site on
                behalf of Conan.io Website. Conan.io Website reserves the right to
                change or discontinue at any time any aspect or feature of the Web
                site.
                <h3 className="pt-4">Exclusion of Liability</h3>
                The content of the pages of this website is for your general
                information and use only. It is subject to change without
                notice.Neither we nor any third parties provide any warranty or
                guarantee as to the accuracy, timeliness, performance, completeness
                or suitability of the information and materials found or offered on
                this website for any particular purpose. You acknowledge that such
                information and materials may contain inaccuracies or errors and we
                expressly exclude liability for any such inaccuracies or errors to
                the fullest extent permitted by law.
                <h3 className="pt-4">Indemnification</h3>
                Your use of any information or materials on this website is entirely
                at your own risk, for which we shall not be liable. It shall be your
                own responsibility to ensure that any products, services or
                information available through this website meet your specific
                requirements.This website contains material which is owned by or
                licensed to us. This material includes, but is not limited to, the
                design, layout, look, appearance and graphics. Reproduction is
                prohibited other than in accordance with the copyright notice, which
                forms part of these terms and conditions.All trade marks reproduced
                in this website which are not the property of, or licensed to, the
                operator are acknowledged on the website.Unauthorized use of this
                website may give rise to a claim for damages and/or be a criminal
                offense.From time to time this website may also include links to
                other websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse the
                website(s). We have no responsibility for the content of the linked
                website(s).
                <h3 className="pt-4">Intelectual Property</h3>
                We claim no intellectual property rights over the content you upload
                to the Website. Your profile and content uploaded remain yours.
                However, by using the FREE mode for your contents, you agree to
                allow others to view your Content. By setting your contents to be
                viewed publicly, you agree to allow others to view and copy your
                contents. The user may include with their contents in a prominent
                and clearly visible manner, a license explaining the main
                limitations or conditions of use of the content, that other users
                must comply with. In the event that the User does not indicate any
                license, default copyright laws apply, stating that the User holds
                all rights over the uploaded contents. However, please notice that
                by uploading contents to Conan you expressly grant Conan the right
                of distribution, reproduction and public communication of the
                contents, as established in the Intellectual Property Act (Minimum
                Required License) as this license is needed by Conan&apos;s platform to
                render its services to other users. This Minimum Required License is
                granted universally and for free. Please notice that Conan just
                needs this license to operate the platform but no further rights are
                granted to Conan or other users. You should ensure when storing
                content in the platform of Conan that you are not infringing rights
                of intellectual property, or any other similar rights on the content
                that you store in Conan. In particular, you should ensure Conan and
                other users of the platform that the storage and the use of the
                content that you store, whether developed by you or by third
                parties, does not violate applicable law or the rights of others.
                Please notice that you are required to indemnify Conan and the
                remaining users against any third party claim arising from the
                violation of their rights of intellectual property or industrial, or
                any similar legal position of economic content, by (i) the use or
                exploitation of contents in accordance with its limitations of use,
                (ii) the use or exploitation of contents in accordance with these
                Terms and Conditions of Use, or (iii) the use you give to the
                service that breach these Terms and Conditions of Use. Also remember
                that you are responsible for checking if the code you intend to use
                includes conditions or limitations of use and, if any, you are
                responsible to respect them.
                <h3 className="pt-4">Copyright</h3>
                Except for material in the public domain under copyright law, all
                material contained on the Web site (including all software, HTML
                code, Java applets, Active X controls and other code) is protected
                by copyright laws. Except as otherwise expressly provided in these
                terms and conditions, you may not copy, distribute, transmit,
                display, perform, reproduce, publish, license, modify, rewrite,
                create derivative works from, transfer, or sell any material
                contained on the Web site without the prior consent of the copyright
                owner.None of the material contained on Conan.io Website may be
                reverse-engineered, disassembled, decompiled, transcribed, stored in
                a retrieval system, translated into any language or computer
                language, retransmitted in any form or by any means (electronic,
                mechanical, photo reproduction, recordation or otherwise), resold or
                redistributed without the prior written consent of Conan.io Website.
                Violation of this provision may result in severe civil and criminal
                penalties.The look and feel of the Service is copyright ©2018 JFrog.
                All rights reserved. You may not duplicate, copy, or reuse any
                portion of the HTML/CSS, Javascript, or visual design elements or
                concepts without express written permission from Conan
              </div>
            </div>
          </div>
        </section>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default TermsConditionPage
