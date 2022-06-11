import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React from "react";
import Head from "@components/Head";
import Link from "next/link";

const PrivacyPolicy: NextPage = () => {
    const mainImage = "https://cdn.sanity.io/images/qgimqc2y/portfolio/723359c857465c4d7548f3dc617c61ff3be341ce-4608x3456.jpg?fit=max&auto=format"

    return (
        <Layout>
            <Head title="Wireshot - Privacy Policy" image={mainImage}
                          description="Privacy Policy in regards to the website usage and tracking">
                [
                <meta name="robots" content="noindex"/>
                ]
            </Head>
            <div className="page-content">
                <div className="my-10 flex justify-center md:justify-start w-full">
                    <div className="dots" aria-hidden="true"></div>
                    <h1 className="text-3xl text-left">Privacy Policy</h1>
                </div>
                <div className="flex  flex-col general-content">

                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <p>I have written this privacy policy to provide you with information in accordance with the
                            requirements of the <Link
                                href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex%3A32016R0679&amp%3Btid=%5Badsimpletextid]">General
                                Data Protection Regulation (EU) 2016/679</Link> as well as to explain what information
                            we collect, how we use data and what choices you have as a visitor to this website.</p>
                        <p>Privacy policies usually sound very technical. However, this version should describe the most
                            important things as simply and clearly as possible. Moreover, technical terms are explained
                            in a reader-friendly manner whenever possible. We would also like to convey that we only
                            collect and use information via this website if there is a corresponding legal basis for it.
                            This is certainly not possible if you give very brief technical explanations, as are often
                            standard on the Internet when it comes to data protection. We hope you find the following
                            explanations interesting and informative. Maybe you will also find some information that you
                            did not know yet.</p>
                        <p>Should you still have questions, we kindly ask you to follow the existing links to see
                            further information on third-party websites, or to simply write an email to <a
                                href="mailto:thiago.megermello@gmail.com">thiago.megermello@gmail.com</a>.</p>
                    </div>

                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <h2 className="text-right w-full">Rights in accordance with the General Data Protection
                            Regulation</h2>
                        <div>
                            You are granted the following rights in accordance with the provisions of the GDPR (General
                            Data Protection Regulation):
                            <ul>
                                <li>right to rectification (article 16 GDPR)</li>
                                <li>right to erasure (“right to be forgotten“) (article 17 GDPR)</li>
                                <li>right to restrict processing (article 18 GDPR)</li>
                                <li>right to notification – notification obligation regarding rectification or erasure
                                    of personal data or restriction of processing (article 19 GDPR)
                                </li>
                                <li>right to data portability (article 20 GDPR)</li>
                                <li>right to object (article 21 GDPR)</li>
                                <li>right not to be subject to a decision based solely on automated processing –
                                    including profiling – (article 22 GDPR)
                                </li>
                            </ul>
                            If you think that the processing of your data violates the data protection law, or that your
                            data protection rights have been infringed in any other way, you can lodge a complaint with
                            your respective regulatory authority.
                        </div>
                    </div>
                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <h2 className="text-right w-full">Automatic Data Retention</h2>
                        <div>
                            <p>
                                Every time you visit a website nowadays, certain information is automatically created
                                and stored, just as it happens on this website. This data should be collected as
                                sparingly as possible, and only with good reason. By website, we mean the entirety of
                                all websites on your domain, i.e. everything from the homepage to the very last subpage
                                (like this one here). By domain we mean example.uk or examplepage.com.
                            </p>
                            <p>
                                Even while you are currently visiting our website, our web server – this is the computer
                                this website is stored on, usually automatically retains data such as the below – for
                                reasons such as operational security or for creating access statistics etc.
                            </p>
                            <ul>
                                <li>the page accessed (/about)</li>
                                <li>the full address (URL) of the accessed website (e. g.
                                    https://www.thizaom.com/about)
                                </li>
                                <li>the network speed (ie. 4g (or slow-2g, 2g, 3g))</li>
                                <li>browser and browser version (e.g. Chrome 87)</li>
                                <li>the operating system used (e.g. Windows 10, Android 10...)</li>
                                <li>the device type used - Mobile (or Desktop/Tablet)</li>
                                <li>Country (ISO 3166-1 alpha-2) (ie. US)</li>
                                <li>Web Vital (FCP 1.0s)</li>
                                <li>Server-Received Event Time (2020-10-29 09:06:30)</li>
                                <li>the address (URL) of the previously visited site (referrer URL) (z. B.
                                    https://www.examplepage.uk/icamefromhere.html/)
                                </li>
                                <li>the host name and the IP-address of the device the website is accessed from (e.g.
                                    COMPUTERNAME and 194.23.43.121)
                                </li>
                                <li>date and time</li>
                                <li>in so-called web server log files.</li>
                            </ul>
                            <p>Generally, these files are stored for two weeks and are then automatically deleted. We do
                                not pass these data to others, but we cannot exclude the possibility that this data may
                                be looked at by the authorities in case of illegal conduct.</p>
                            <p>In short: your visit is logged by our provider (company that runs our website on
                                servers), but we do not pass on your data!</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <h2 className="text-right w-full">Cookies</h2>
                        <div>
                            <p>This website uses HTTP-cookies to store user-specific data.</p>
                            <p>For your better understanding of the following Privacy Policy statement, we will explain
                                to you below what cookies are and why they are in use.</p>
                            <h3>What exactly are cookies?</h3>
                            <div>
                                <p>Every time you surf the internet, you use a browser. Common browsers are for example
                                    Chrome, Safari, Firefox, Internet Explorer and Microsoft Edge. Most websites store
                                    small text-files in your browser. These files are called cookies.
                                </p>
                                <p>What should not be dismissed, is that cookies are very useful little helpers. Nearly
                                    all websites use cookies. More accurately speaking these are HTTP-cookies, since
                                    there are also different cookies for other uses. http-cookies are small files which
                                    our website stores on your computer. These cookie files are automatically put into
                                    the cookie-folder, which is like the “brain” of your browser. A cookie consists of a
                                    name and a value. Moreover, to define a cookie, one or multiple attributes must be
                                    specified.
                                </p>
                                <p>Cookies save certain parts of your user data, such as e.g. language or personal page
                                    settings. When you re-open our website, your browser submits these “user specific”
                                    information back to our site. Thanks to cookies, our website knows who you are and
                                    offers you the settings you are familiar to. In some browsers every cookie has its
                                    own file, in others such as Firefox, all cookies are stored in one single file.
                                </p>
                                <p>There are both first-party cookies and third-party cookies. First-party cookies are
                                    created directly by our site, while third-party cookies are created by
                                    partner-websites (e.g. Google Analytics). Every cookie is individual, since every
                                    cookie stores different data. The expiration time of a cookie also varies – it can
                                    be a few minutes, or up to a few years. Cookies are no software-programs and contain
                                    no computer viruses, trojans or any other malware. Cookies also cannot access your
                                    PC’s information.
                                </p>
                                <p>
                                    This is an example of how cookie-files can look:
                                </p>
                                <ul>
                                    <li>
                                        <div>
                                            <b>name:</b> _ga <br/>
                                            <b>value:</b> GA1.2.1326744211.152111752311-9 <br/>
                                            <b>purpose:</b> differentiation between website visitors <br/>
                                            <b>expiration date:</b> after 2 years <br/>
                                        </div>
                                    </li>
                                </ul>
                                <p>
                                    A browser should support these minimum sizes:
                                </p>
                                <ul>
                                    <li>at least 4096 bytes per cookie</li>
                                    <li>at least 50 cookies per domain</li>
                                    <li>at least 3000 cookies in total</li>
                                </ul>
                                <p>Generally, these files are stored for two weeks and are then automatically deleted.
                                    We do
                                    not pass these data to others, but we cannot exclude the possibility that this data
                                    may
                                    be looked at by the authorities in case of illegal conduct.</p>
                                <p>In short: your visit is logged by our provider (company that runs our website on
                                    servers), but we do not pass on your data!</p>
                            </div>
                            <h3>Which types of cookies are there?</h3>
                            <div>
                                <p>
                                    What exact cookies we use, depends on the used services. We will explain this in the
                                    following sections of the Privacy Policy statement. Firstly, we will briefly focus
                                    on
                                    the different types of HTTP-cookies.
                                </p>
                                <p>There are 4 different types of cookies:</p>
                                <p>
                                    <b>Essential Cookies</b><br/>These cookies are necessary to ensure the basic
                                    function of
                                    a website. They are needed when a user for example puts a product into their
                                    shopping
                                    cart, then continues surfing on different websites and comes back later in order to
                                    proceed to the checkout. Even when the user closed their window priorly, these
                                    cookies
                                    ensure that the shopping cart does not get deleted.

                                </p>
                                <p>
                                    <b> Purposive Cookies</b><br/>These cookies collect info about the user behaviour
                                    and
                                    record if the user potentially receives any error messages. Furthermore, these
                                    cookies
                                    record the website’s loading time as well as its behaviour within different
                                    browsers.

                                </p>
                                <p>
                                    <b>Target-orientated Cookies</b><br/>These cookies care for an improved
                                    user-friendliness. Thus, information such as previously entered locations, fonts or
                                    data
                                    in forms stay saved.

                                </p>
                                <p>
                                    <b>Advertising Cookies</b><br/>These cookies are also known as targeting-Cookies.
                                    They
                                    serve the purpose of delivering individually adapted advertisements to the user.
                                    This
                                    can be very practical, but also rather annoying.
                                </p>

                                <p>
                                    Upon your first visit to a website you are usually asked which of these cookie-types
                                    you
                                    want to accept. Furthermore, this decision will of course also be saved in a cookie.
                                </p>
                            </div>
                            <h3>How can I delete cookies?</h3>
                            <div>
                                <p>
                                    You yourself take the decision if and how you want to use cookies. Thus, no matter
                                    what
                                    service or website cookies are from, you always have the option to delete,
                                    deactivate or
                                    only partially allow them. Therefore, you can for example block cookies of third
                                    parties
                                    but allow any other cookies.
                                </p>
                                <p>
                                    If you want change or delete cookie-settings and would like to determine which
                                    cookies
                                    have been saved to your browser, you can find this info in your browser-settings:
                                </p>

                                <p>
                                    <Link href="https://support.google.com/chrome/answer/95647?tid=111752311">Chrome:
                                        Clear, enable and manage cookies in Chrome
                                    </Link>
                                </p>

                                <p>
                                    <Link
                                        href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac?tid=111752311">
                                        Safari: Manage cookies and website data in Safari
                                    </Link>
                                </p>

                                <p>
                                    <Link
                                        href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">
                                        Firefox: Clear cookies and site data in Firefox
                                    </Link>
                                </p>

                                <p>
                                    <Link
                                        href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d#:~:text=In%20Internet%20Explorer%2C%20select%20the,box%2C%20and%20then%20select%20Delete.">
                                        Internet Explorer: Delete and manage cookies
                                    </Link>
                                </p>

                                <p>
                                    <Link
                                        href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">
                                        Microsoft Edge: Delete cookies in Microsoft Edge
                                    </Link>
                                </p>
                                <p>
                                    If you generally do not want to allow any cookies at all, you can set up your
                                    browser in a way, to notify you whenever a potential cookie is about to be set. This
                                    gives you
                                    the opportunity to manually decide to either permit or deny the placement of every
                                    single cookie. The settings for this differ from browser to browser. Therefore, it
                                    might be
                                    best for you to search for the instructions in Google. If you are using Chrome, you
                                    could for example put the search phrase “delete cookies Chrome” or “deactivate
                                    cookies Chrome” into Google.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <h2 className="text-right w-full">How is my data protected?</h2>
                        <div>
                            <p>There is a “cookie policy” that has been in place since 2009. It states that the storage
                                of cookies requires the user’s consent. However, among the countries of the EU, these
                                guidelines are often met with mixed reactions.</p>
                            <p>If you want to learn more about cookies and do not mind technical documentation, we
                                recommend <Link
                                    href="https://tools.ietf.org/html/rfc6265">https://tools.ietf.org/html/rfc6265</Link>,
                                the Request for Comments of the Internet
                                Engineering Task Force (IETF) called “HTTP State Management Mechanism”.</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-full flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <h2 className="text-right w-full">Vercel Privacy Policy</h2>
                        <div>
                            <p>
                                For our website we use the website hosting Vercel by the company Vercel Inc.,340 S Lemon
                                Ave #4133, Walnut, CA 91789, US.
                                Due to the use of Vercel, your personal data may be collected, stored and processed.
                                In this privacy policy we want to explain why this website use Vercel, what
                                data is stored, how long your data is stored and how you can prevent data retention.
                            </p>
                            <p>Below you can find an excerpt of Vercel&apos;s privacy policy and what we deemed relevant - if
                                you would like to </p>
                            <h3>What is Vercel?</h3>
                            <p>
                                Vercel is a hosting platform for frontend frameworks and static sites, built to
                                integrate with headless content, commerce, or database.
                                It provides a frictionless developer experience to take care of the hard things:
                                deploying instantly, scaling automatically, and serving personalized content around the
                                globe. It make it easy for frontend teams to develop, preview, and ship delightful user
                                experiences, with a extreme focus on performance.
                            </p>
                            <h3>Why does this website use Vercel?</h3>
                            <p>
                                For working on our website, we required an easy-to-use system, that allows us to present
                                you
                                an interesting design and content quickly and easily. We have found a
                                combination of a headless CMS (Sanity.io) and Vercel to be the right system for this.
                                Vercel’s easy operation and its extensive functions, we can design our
                                website as we wish, while ensuring its user-friendliness.
                            </p>
                            <h3>What data is stored by Vercel?</h3>
                            <p>
                                As noted above, Vercel deploy and host websites and provide other analytics tools for
                                this website to be maintained. This website may collect personal information from
                                their End Users in connection with the products or services that offered to End
                                Users. Since Vercel hosts our website and provide other analytics tools, Vercel
                                processes End Users&apos; information when they use this website, web applications, and APIs.
                                This information may also include, but is not limited to, IP addresses, system
                                configuration
                                information, and other information about traffic to and from this websites
                                (collectively, the &quot;Log Data&quot;), as well as Location Information derived from IP
                                addresses. Vercel do not, however, collect or process End Users’ IP addresses through
                                the use of its analytics Services. All of this information is stored on Vercel&apos;s
                                platform as part
                                of its Services, but our website is responsible for the content transmitted across our
                                network (e.g., images, written content, graphics, etc.), as well as any personal
                                information this website collects. With respect to Log Data, Vercel collects and use Log
                                Data to
                                operate, maintain, and improve our Services in performance of our obligations under our
                                Customer agreements.
                                For example, Log Data can help Vercel to detect new threats, identify malicious third
                                parties, and provide more robust
                                security protection for this website.
                            </p>
                            <h3>How long/where is the data stored?</h3>
                            <p>
                                Vercel uses the following criteria to determine our retention periods:
                                <ul>
                                    <li>The amount, nature and sensitivity of your information;</li>
                                    <li>The reasons for which we collect and process the personal data;</li>
                                    <li>The length of time we have an ongoing relationship with you and provide you with
                                        access
                                        to our Platform; and
                                    </li>
                                    <li>applicable legal requirements.</li>
                                </ul>
                                Vercel retains personal information for as long as needed to provide its Services. Note,
                                however, that it may retain certain essential account information of our website
                                maintainer(s),
                                but otherwise regularly delete other information that is less essential to the provision
                                of our Services in order to minimize its storage of
                                data.
                            </p>
                            <p>When it comes to Anonymization - in some instances, it may choose to anonymize your
                                personal data instead of deleting it, for statistical use, for instance. When it chooses
                                to anonymize, it make sure that there is no way that the personal data can be linked
                                back to you or any specific user.
                            </p>
                            <h3>Additional Information for Users in the EEA and the UK.</h3>
                            <p>
                                If the GDPR applies to you because you are in the EEA or the UK, you have certain rights
                                in relation to your personal data:<br/>
                                <ul>
                                    <li>The right to be informed: Vercel has the obligation to inform you that we
                                        process your
                                        personal data (and that&apos;s what we&apos;re doing in this Privacy Policy);
                                    </li>
                                    <li>The right of access: your right to request a copy of the personal data Vercel
                                        hold
                                        about you (also known as a &apos;data subject access request&apos;);
                                    </li>
                                    <li>The right of rectification: your right to request that Vercel corrects personal
                                        data
                                        about you if it is incomplete or inaccurate (though we generally recommend first
                                        making any changes in your Account Settings);
                                    </li>
                                    <li>The right to erasure (also known as the &apos;right to be forgotten&apos;): under certain
                                        circumstances, you may ask Vercel to delete the personal data they have about
                                        you
                                        (unless it remains necessary for us to continue processing your personal data
                                        for a legitimate business need or to comply with a legal obligation as permitted
                                        under the GDPR, in which case we will inform you);
                                    </li>
                                    <li>The right to restrict processing: your right, under certain circumstances, to
                                        ask Vercel to suspend their processing of your personal data;
                                    </li>
                                    <li>The right to data portability: your right to ask Vercel for a copy of your
                                        personal
                                        data in a common format (for example, a .csv file);
                                    </li>
                                    <li> The right to object: your right to object to Vercel processing your personal
                                        data
                                        (for example, if you object to them processing your data for direct marketing);
                                        and
                                    </li>
                                    <li>Rights in relation to automated decision-making and profiling: Vercel&apos;s
                                        obligation to
                                        be transparent about any profiling we do, or any automated decision-making.
                                    </li>
                                    <li> These rights are subject to certain rules around when you can exercise them.
                                    </li>
                                </ul>
                                <h3> Customers, Site Visitors and Event Attendees in the EEA or the UK.</h3>
                                <p> If you are located in the EEA or the UK and you are a visitor of our website, and
                                    wish to exercise any of the rights set out above, you may contact Vercel at privacy@vercel.com
                                    using the term &quot;DSR&quot; as your email subject line.
                                </p>
                                <p>You will not have to pay a fee to access your personal data (or to exercise any
                                    of the other rights) unless your request is clearly unfounded, repetitive or
                                    excessive. Alternatively, Vercel may refuse to comply with your request under those
                                    circumstances.
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy