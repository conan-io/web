import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';

function PrivacyPolicyPage() {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <section id="privacy-policy" className="py-5">
          <div className="container section-content">
            <div className="row">
              <div className="col text-left">
                <h2>Privacy Policy</h2>
                <p>Last updated: 1 October 2023</p>
                <div style={{height: "40px"}}></div>
                <ol>
                  <li>
                    <a href="#nr1" className="text-dark">
                      <b>What information do we collect and how?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr2" className="text-dark">
                      <b>How do we use the information collected?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr3" className="text-dark">
                      <b>How can you control your information?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr4" className="text-dark">
                      <b>Who do we share information with?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr5" className="text-dark">
                      <b>How do we protect your information?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr6" className="text-dark">
                      <b>Where is your information stored and for how long?</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr7" className="text-dark">
                      <b>Third-party websites and social media features</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr8" className="text-dark">
                      <b>Changes to this Privacy Policy</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr9" className="text-dark">
                      <b>Our policy towards children</b>
                    </a>
                  </li>
                  <li>
                    <a href="#nr10" className="text-dark">
                      <b>Got any questions?</b>
                    </a>
                  </li>
                </ol>

                <div style={{height: "40px"}}></div>

                <p>
                  JFrog (including our Affiliates worldwide – collectively, “<b>JFrog</b>“,
                  “<b>us</b>”, “<b>our</b>” or “<b>we</b>”) is on a
                  mission to enable continuous updates through liquid software, empowering developers
                  to code high-quality applications that securely flow to end-users with zero downtime.
                </p>
                <p>
                  This Privacy Policy (“<b>Policy</b>”) applies to JFrog’s solution,
                  product, platform, and services (the “<b>Platform</b>”) and describes
                  how we collect, use, and disclose your information. We respect the privacy of
                  our customers, users, partners, and website visitors (collectively – “<b>
                  you</b>”, or “<b>your</b>”) and are committed to
                  protecting the personal information that you disclose to us. We have made
                  efforts to make our Policy as clear and informative as possible and we encourage
                  you to carefully read it.
                </p>
                <p>
                  At all times, you may choose whether to provide or disclose your personal information.
                  Personal information means information that identifies, relates to, describes, is reasonably
                  capable of being associated with, or linked, directly or indirectly, to an individual.
                  Please note, this does not include aggregated and/or anonymized information.
                  If you choose not to provide such personal information, you may still visit parts
                  of the Websites or receive limited Services, but you may be unable to access
                  certain options, programs, offers, and services that involve our interaction with you.
                </p>
                <p>
                  Please note that this Policy applies to the information provided by you
                  through any website of JFrog, including <a href="https://www.jfrog.com/">
                  <b>https://www.jfrog.com/</b></a>(together with its sub-domains and portals,
                  the <b>“Websites”</b>) that link to this Policy, including,
                  for example, by registering and/or attending events and meetups, or
                  as you may otherwise interact with us (together with the Websites
                  and Platform - the <b>“Services”</b>).
                  By accessing and/or using our Services you agree to this Policy,
                  <b>including to the collection and processing of your personal information.
                  In case you disagree with any of these terms please do not provide
                  us with any personal information and avoid contacting us or using our Services.</b>
                </p>

                <h3 className="text-capitalize pt-4" id="nr1">
                  1. What information do we collect and how?
                </h3>

                <p>
                  <b>Directly from you or via our customer (i.e., your employer or the organization
                  you are related to)</b>. For example, if you fill out a form or communicate with
                  us through our Websites, or when your organization subscribes and engages with
                  JFrog to receive Services. This includes information such as business contact
                  details – first and last name, job title, email address, company address,
                  phone number, professional needs and interests, and your interactions
                  with us, including posting comments or feedback on our forums,
                  session recordings, correspondence or calls recordings and associated
                  transcriptions (if applicable).
                </p>
                <p>
                  <b>Directly and indirectly from you when using our Services</b>.
                  For example, usage details collected automatically during your interaction
                  with our Services, such as the type of browser you use, IP address, device ID,
                  cookies installed on the device, date/time stamp, referring/exit pages,
                  clicked pages, the actions you take on the Services and any other information your
                  browser may send us. We use industry standard tools and software to monitor your
                  visits, navigation and interactions with the Services, your usage pattern-logs
                  and other analytics information. We may also use cookies and/or similar
                  technologies (“<b>cookies</b>”), which store certain information on your computer,
                  and which allow us to enable automatic activation of particular features and
                  improve your experience. Most browsers will allow you to erase such cookies,
                  block acceptance of cookies, or receive a warning before a cookie is stored.
                  However, if you block or erase cookies, or change the applicable settings,
                  your experience on our Services may be limited. For more information,
                  please see our <a href="https://jfrog.com/jfrog-cookies-policy/"><b>Cookie Policy</b></a>.
                </p>
                <p>
                  <b>Directly from you or via our customer (i.e., your employer or the
                  organization you are related to).</b> For example, if you fill out a form
                  or communicate with us through our Websites, or when your organization
                  subscribes and engages with JFrog to receive Services. This includes
                  information such as business contact details – first and last name, job title,
                  email or physical address, phone number, professional needs and interests,
                  and your interactions with us, including posting comments or feedback on our
                  forums, session recordings, correspondence or calls recordings and associated
                  transcriptions (if applicable).
                </p>

                <p>
                  <b>From external providers that contract with us or interact with us in connection
                  with the Services we provide</b>. For example, from vendors and partners such
                  as social media sites and analytics providers that integrate their
                  services with ours or provide us access to their services.
                </p>

                <h3 className="text-capitalize pt-4" id="nr2">
                  2. How do we use the information collected?
                </h3>

                <p>
                  We will only collect and process your personal information in order
                  to abide by our legal obligations; comply with a contract between us
                  and you or a third party you are associated with; for the performance
                  of our Services; and to support our legitimate interests in maintaining
                  and improving our Services (e.g., analyzing the use of our Services,
                    advertising our Services, providing customer support, and protecting
                    the security of our Services, as well as our own and our customers’ data).
                </p>
                <p>
                  Your acceptance of our related <a href="https://jfrog.com/terms-of-use/"><b>Terms
                  of Use</b></a> and this Policy will be deemed as your consent, provided this is
                  the only legal basis allowed for processing personal information in the applicable
                  territory. If you wish to withdraw your consent for such processing to
                  the extent permitted by applicable law, please contact us
                  at: <a href="mailto:privacy@jfrog.com"><b>privacy@jfrog.com</b></a>.
                </p>
                <p>
                  We may use or disclose the personal information we collect for
                  the following purposes:
                </p>
                <ul>
                <li>
                  To fulfill or meet the reason you provided the information.
                  For example, if you disclose your name and contact information to
                  request a price quote or ask a question about our Services, or to
                  process your payment and facilitate billing communication
                  (Performance of Contract; Legitimate Interests);
                </li>
                <li>
                  To enable the use of the Services, including for registration and
                  authentication. For example, in order to register to the Services,
                  you will need to provide us with your name and email so we will be
                  able to issue a license key (Performance of Contract; Legitimate Interests);
                </li>
                <li>
                  To support, personalize, improve and develop our Services by learning
                  about your preferences and general trends relating to the Services (Legitimate Interests);
                </li>
                <li>
                  To create, maintain, customize, and secure your account with us
                  (Performance of Contract; Legitimate Interests; Legal Obligation);
                </li>
                <li>
                  To process your requests, transactions, payments and prevent fraud
                  (Performance of Contract; Legitimate Interests; Legal Obligation);
                </li>
                <li>
                  To provide you with support and to respond to your inquiries,
                  including to investigate and address your concerns and monitor
                  and improve our responses (Performance of Contract; Legitimate Interests);
                </li>
                <li>
                  To personalize your Websites experience and to deliver content,
                  product and service offerings relevant to your interests, regarding
                  new products, events, offers, services, features, enhancements,
                  special offers, upgrade opportunities, and events, including targeted
                  offers and ads through our Websites, third-party service providers’
                  (“<b>Service Providers</b>”) sites or via email (Legitimate Interests; Consent);
                </li>
                <li>
                  To help maintain the safety, security, and integrity of our Services,
                  databases and other technology assets and businesses (Performance of
                    Contract; Legitimate Interests; Legal Obligation);
                </li>
                <li>
                  To respond to law enforcement requests as required by applicable law,
                  court order, or governmental regulations (Legitimate Interests;
                    Legal Obligation);
                </li>
                <li>
                  To evaluate or conduct a merger, divestiture, restructuring, reorganization,
                  dissolution, or other sale or transfer of some or all JFrog’s assets,
                  whether as an ongoing concern or as part of bankruptcy, liquidation, or
                  similar proceeding, in which personal information held by JFrog about
                  you is among the assets transferred (Legitimate Interests; Legal Obligation).
                </li>
                </ul>

                <h3 className="text-capitalize pt-4" id="nr3">
                  3. How can you control your information?
                </h3>

                <p>
                  Privacy regulations worldwide such as the EU/UK General Data Protection Regulation
                  (GDPR), the California Consumer Privacy Act (CCPA), and the Japan Act on the
                  Protection of Personal Information (APPI) provide certain rights for data subjects.
                  If you wish to exercise your rights under the applicable data protection regulation,
                  <b>please submit your request via <a href="https://preferences.jfrog.com/privacy">JFrog
                  Privacy Request Form</a></b>.
                </p>
                <p>
                  You have a right to access and correct (rectify) the record of your personal
                  information maintained by JFrog if it is inaccurate. You may request that
                  JFrog erase that data or cease processing it, subject to certain
                  exceptions, or to confirm whether we process your personal information,
                  or if we comply with the right to non-discrimination of service and
                  price (if applicable). Upon your request, and when technically feasible,
                  JFrog will provide your personal information to you or directly transmit
                  it (if applicable). You also have a right to access your personal
                  information disclosed to/received from related third parties,
                  to the extent permitted by applicable law.
                </p>
                <p>
                  Please note that: (a) we may require additional information in order to
                  verify your request; (b) if you will not respond within 14 days from
                  our initial verification email, you will be notified that your request
                  was closed, and we will not be able to accommodate it; (c) your request
                  may be recorded by us for legal obligations in accordance with <b>Section
                  6</b>; (d) if you are using the Services on behalf of our customer
                  (i.e., your employer or the organization you are related to),
                  you should contact your account administrator with your request,
                  if you will contact us directly we will disclose such request with
                  the relevant customer; and (e) we may charge a reasonable fee or
                  refuse to act on a request if such request is excessive, repetitive,
                  manifestly unfounded, or if we required to or allowed by the applicable law or regulation.
                </p>
                <p>
                  You may also request that JFrog cease using your information for
                  direct marketing purposes. Please note that you may manage the receipt
                  of marketing information from us by clicking on the “unsubscribe” link
                  located on the bottom of the email and/or by <b>updating your communication preferences
                  via </b><a href="https://leap.jfrog.com/SubscriptionCenter.html?mkt_unsubscribe=1&amp;">
                  <b>JFrog Subscription Center</b></a>. We may also contact you with service
                  information such as billing/login issues, surveys, event information
                  following your registration, etc.
                </p>
                <p>
                  Please also note that if you have concerns about how JFrog processes
                  your personal information, you have a right to lodge a complaint with
                  the appropriate local data protection authority. You can also call us
                  at +1-408-329-1540 (for Californian Consumers) or contact us
                  at: <a href="mailto:privacy@jfrog.com"><b>privacy@jfrog.com</b></a>.
                </p>

                <h3 className="text-capitalize pt-4" id="nr4">
                  4. Who do we share information with?
                </h3>

                <p>
                  Our Websites and some of the Platform allow you to disclose information
                  to other users and create and publish content. Any content that you post
                  on or via the Services (“User Submissions”), may be publicly available
                  to other users. The notices and tools that we provide on the Services are
                  intended to inform you which information will be made publicly available.
                  If you publish your personal information in any User Submissions,
                  you may receive unsolicited messages from other users of the Websites
                  or the public. Therefore, we encourage you only to post information
                  that you are sure you want to be accessible to anyone.
                </p>
                <p>
                  If you are using our Services on behalf of an organization or if
                  you provide us with an email address which belongs to an organization,
                  certain information provided to us may be accessible to the respective
                  administrator or to other users of such organization.
                </p>
                <p>
                  JFrog uses contracted Service Providers to perform services on our
                  behalf or to enable us to provide the Services. These Service Providers
                  may have access to personal information, depending on their specific
                  roles and purposes in facilitating our Services or other activities,
                  and they are not permitted to store, retain, or use information collected
                  by us except for the sole purpose of providing the Services in accordance
                  with our agreement with them. Such Service Providers may include: billing
                  and payment processing services; web and video hosting services; email
                  communications and monitoring providers; analytics providers (such as Google Analytics or Heap);
                  session or activity recording services; call recording, analytics and
                  transcription services (transcriptions may be analyzed by machine
                  learning and/or artificial intelligence platform in accordance
                  with <b>Section 2</b> above); data storage providers; remote access services;
                  performance measurement, data optimization and marketing services;
                  social, marketing and advertising providers; lead generation,
                  conversion and scheduling service providers; video conferencing
                  solutions; support and customer relation management systems; and
                  data and cyber security services.
                </p>
                <p>
                  When you visit our Websites, we may enable such Service Providers to use
                  cookies and other trackers to show you ads on third-party websites that
                  are more relevant to you. Under some data protection laws, like the CCPA,
                  as amended, our disclosure of this data to third parties through cookies
                  and other trackers for targeted advertising may be considered a “sale” or
                  “sharing” of personal information. Please see
                  our <a href="https://jfrog.com/jfrog-cookies-policy/"><b>Cookie Policy</b></a> for
                  more information about the types of cookies we use, or click “Cookie Settings”
                  at the bottom of the Websites to set your preferences and opt out of the
                  sale or sharing (for targeted advertising) of your data. We don’t have actual
                  knowledge that we “sell“ or “share“ the personal information of individuals
                  under eighteen (18) years of age (see <b>Section 9</b> below). For the purpose of
                  the CCPA, specifically in the past 12 months, we may have collected and
                  disclosed the following categories of personal information (as defined in
                  the CCPA): Identifiers; Professional or Employment-Related Information;
                  Internet or Other Electronic Network Activity information; and Geolocation
                  information, to our Affiliates and Service Providers. We do not collect
                  or disclose sensitive personal information as defined in the CCPA.
                </p>
                <p>
                  With regards to JFrog’s Cloud Solution, please see our <a href="https://jfrog.com/trust/privacy/sub-processors/"><b>Sub-Processors List</b></a>.
                </p>
                <p>
                  We also reserve the right to use or disclose your information if:
                  (a) required by law, under a judicial proceeding, court order, or
                  legal processor if we reasonably believe that such disclosure is
                  required to protect our rights, including their enforcement; (b)
                  to transfer or assign the personal information retained by us in
                  the event that we are acquired by or merged with a third party entity;
                  (c) to disclose information internally within JFrog; (d) in the event
                  of bankruptcy or a comparable event; or (e) if we rendered such
                  information non-personal.
                </p>
                <p>
                  JFrog (including our Affiliates worldwide listed <a href="https://jfrog.com/affiliates/"><b>here</b></a>)
                  may jointly use your personal information as stipulated in <b>Section 1</b> and <b>Section 2</b> of this Policy.
                  For data protection matters, JFrog SAS and JFrog UK Limited have been designated
                  as JFrog representatives under the GDPR in the EU and the UK respectively,
                  as well as JFrog Japan KK who has been designated as JFrog representative
                  in Japan under the APPI.
                </p>

                <h3 className="text-capitalize pt-4" id="nr5">
                  5. How do we protect your information?
                </h3>

                <p>
                  We use industry standard technologies and internal procedures to maintain
                  the security and integrity of our Services and your information, and to prevent
                  unauthorized access thereto. <b>Please visit <a href="https://jfrog.com/trust/">JFrog Trust Center</a> for further information</b>.
                  Please note, however, that there are inherent risks in transmission of
                  information over the internet or other methods of electronic storage
                  and we cannot guarantee that unauthorized access or use of your information will never occur.
                </p>





                <h3 className="text-capitalize pt-4" id="nr6">
                  6. Where is your information stored and for how long?
                </h3>

                <p>
                  JFrog operates globally and our Services are provided from various location.
                  In order to allow us to perform our obligations and provide you with theServices,
                  we may share information within our group of companies (a list thereof
                  isavailable <a href="https://jfrog.com/affiliates/"><b>here</b></a>) and with other
                  contracted third-party service providers, which may be located outside
                  your country of residence.
                </p>
                <p>
                  When sharing such information, we use appropriate legal mechanisms to
                  safeguard the transfer, such as the Standard Contractual Clauses (<b>SCC</b>),
                  which have been approved by the European Commission Implementing Decision
                  2021/914, to safeguard the transfer of information from the European Economic
                  Area and Switzerland (collectively – the “<b>EEA</b>”) outside of the EEA.
                  You can obtain a copy of the SCCs by contacting us
                  at: <a href="mailto:privacy@jfrog.com"><b>privacy@jfrog.com</b></a>.
                </p>
                <p>
                  Please note that we may transfer such information to a country and jurisdiction
                  that may not have equivalent privacy and data protection laws that apply
                  to your country of residence. Regardless of where your information is
                  stored, we, our affiliates and third-party service providers apply the same
                  protections described in this Policy.
                </p>
                <p>
                  With regards to JFrog’s Cloud Solution, please see our <b>Data Processing
                  Addendum </b><a href="https://jfrog.com/jfrog-cloud-data-processing-addendum/"><b>here</b></a>.
                  and <a href="https://jfrog.com/trust/privacy/"><b>Privacy FAQs</b></a>.
                </p>
                <p>
                  For example, we will retain your information for as long as you are using our Services,
                  and for a reasonable period thereafter. Please note, we are not required to
                  retain personal information for a specific time period and are free to remove
                  it at any moment. Aggregated and/or anonymous data, and any other non-personal
                  information may be retained by us as permitted under the applicable privacy laws.
                  Please note, your credit card details are not retained by JFrog (if relevant),
                  but rather transported directly to the applicable Service Provider (per
                  <b>Section 4</b> above)
                </p>

                <h3 className="text-capitalize pt-4" id="nr7">
                  7. Third-party websites and social media features
                </h3>

                <p>
                  Our Services may include social media features (“<b>Features</b>“), for example,
                  you can share posts and comments on or through your social media account.
                  The Features may enable the applicable social networks to collect your IP
                  address and other automatically collected usage details and may set a
                  cookie to enable the functionality of the Feature (see <b>Section 1</b>).
                  Your interactions with the Features are governed by the privacy policy of
                  the third party who provided such Features, and we are not responsible
                  for the privacy practices or the content of such third-party Features.
                  Please be aware that the third parties providing the Features may collect
                  personal information from you. Accordingly, we encourage you to read the
                  terms and conditions and privacy policy of each relevant third party that
                  you choose to use or interact with.
                </p>
                <p>
                  In addition, certain links on our Websites, enables you to enter other sites or
                  services. Those linked sites and services are provided solely as a convenience
                  to you and are not under the control of JFrog. We are not responsible or liable
                  for such linked sites and services’ privacy practices and/or any other practices.
                  Your access to, use of, and reliance upon any such sites, services and content
                  and your dealings with such third parties are at your sole risk and expense.
                </p>

                <h3 className="text-capitalize pt-4" id="nr8">
                  8. Changes to this Privacy Policy
                </h3>

                <p>
                  The terms of this Policy will govern the use of the Services and any
                  information collected by JFrog. JFrog reserves the right to change
                  this Policy at any time by posting an updated version on our Services.
                  We will provide notice of substantial changes to this Policy on the
                  homepage of the Websites. All other changes to this Policy are effective
                  as of the stated “Last Updated” date and your continued use of the Services
                  after the Last Updated date will constitute acceptance of, and agreement to
                  be bound by, those changes. If the Policy is required to be amended to
                  comply with any legal requirements, the amendments may take effect
                  immediately, or as required by the law and without any prior notice.
                </p>

                <h3 className="text-capitalize pt-4" id="nr9">
                  9. Our policy towards children
                </h3>

                <p>
                  The Websites is intended for users over the age of eighteen (18). Therefore,
                  JFrog does not intend and does not knowingly collect personal information
                  from children under the age of eighteen (18). We reserve the right to
                  request proof of age when needed. If we learn that we collected personal
                  information from children under the age of eighteen (18) we will delete
                  that information promptly. Please contact JFrog at <a href="mailto:privacy@jfrog.com"><b>privacy@jfrog.com</b></a> if
                  you have
                  reasons to suspect that JFrog collected such information.
                </p>

                <h3 className="text-capitalize pt-4" id="nr10">
                  10. Got any questions?
                </h3>

                <p>
                  We are committed to protecting your privacy. If you have any questions
                  concerning this Policy, please contact us at: <a href="mailto:privacy@jfrog.com"><b>privacy@jfrog.com</b></a> or
                  write to us at: JFrog, 270 E. Caribbean Drive, Sunnyvale, CA 94089,
                  and we will make an effort to reply within a reasonable timeframe.
                </p>
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

export default PrivacyPolicyPage
