import React from "react";
import Image from "next/image"
import styles from "@/styles/Laso.module.css";
import Link from "next/link";

const ScholarshipApplyBtn = () => (
    <div>
        <button className={styles.scholarshipApplyBtn} onClick={() => {window.open('https://forms.gle/V8foYKcDCLfJVUqQ8','_blank')}}>
            Apply now
        </button>
    </div>
);

const ScholarshipSummary = () => (
    <section id={styles.scholarshipSummary} style={{"overflow": "hidden"}}>
        <div className="container pt-4">
            <div className="row">
                <div className={`col-8 ${styles.scholarshipSummaryCard}`}>
                    <div className="row">
                        <div className="col-8">
                            <h2 style={{textTransform: "none"}}>The LASO Scholarship</h2>
                            <h3>In memory of Luis Martinez de Bartolomé, &#34;Laso&#34;</h3>
                            <p>
                                To honor the legacy of Luis Martínez de Bartolomé, affectionately known as &#34;Laso&#34;,
                                a scholarship has been established to commemorate his exceptional technical talent, integrity,
                                and profound impact on the community. This scholarship is a tribute to his life and his
                                invaluable contributions, supporting others in achieving their own aspirations in his memory.
                            </p>
                            <div className="d-block d-md-none align-content-center">
                                <img alt="Laso portrait" src="/laso/laso.png"
                                     style={{"maxWidth": "none", "width": "400px"}}/>
                            </div>
                            <ScholarshipApplyBtn/>
                        </div>
                        <div className="col-md-3 d-none d-md-block align-content-end overflow-visible">
                            <img alt="Laso portrait" src="/laso/laso.png"
                                   style={{"maxWidth": "none", "marginLeft": "100px", "width": "400px"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipDescription = () => (
    <section id={styles.scholarshipDescription}>
        <div className="container py-4">
            <div className="row">
                <div className="col-7">
                    <h2>The Scholarship</h2>
                    <div className={styles.lasoUnderTitle}></div>
                    <p>
                        The Laso scholarship was created in memory of Luis Martinez de Bartolomé, a dear colleague and
                        friend, and recognize his significant contribution to open source and C++ world.
                    </p>
                    <p>
                        The Laso scholarship will be provided to students of Spanish public universities in any degree
                        of CS, Engineering or similar.
                    </p>
                    <p>The scholarship will cover the costs of one year tuition.</p>
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipProcess = () => (
    <section id="scholarshipProcess">
        <div className="container py-4 justify-content-center">
            <div className="row">
                <div className="col-4">
                    <Image alt="Students in a field" src="/laso/students.webp" width={"500"} height={"300"}
                    style={{"height": "auto"}}/>
                </div>
                <div className="col-6">
                    <h2>Nomination Process</h2>
                    <div className={styles.lasoUnderTitle}></div>
                    <ol>
                        <li>
                            Applicants must be students of at least half a full course for 2025-2026 of Spanish public
                            universities.
                        </li>
                        <li>
                            The main criteria will be the quantity and relevance of open-source contributions during the
                            past 12 months prior to submission of the application.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipApplication = () => (
    <section id="scholarshipApplication">
        <div className="container py-4">
            <div className="row">
                <div className="col-7">
                    <h2>How to apply</h2>
                    <div className={styles.lasoUnderTitle}></div>
                    <p>
                        Each candidate will submit up to 5 public open source
                        repositories (with a valid OSS license) with the Github/Gitlab/other username used to contribute to that repository.
                    </p>
                    <p>
                        The number of lines of code contributed in the past year for every repository will be counted.
                        That will be weighted by the number of stars of the repository, with a factor from 0-10,
                        computed as the number of stars (capped at 10K) divided by 1000.
                    </p>
                    <p>
                        <Link href="/laso-terms">The terms of the scholarship are available here</Link>.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipTimeline = () => (
    <section id={styles.scholarshipTimeline}>
        <div className="container py-4">
            <div className="row justify-content-between">
                <div className="col-2">
                    <div className={styles.timelineOrder}>1</div>
                    <div className={styles.scholarshipTimelineDate}>May 26, 2025</div>
                    <div className="desc">Enrollment opens</div>
                </div>
                <div className="col-2">
                    <div className={styles.timelineOrder}>2</div>
                    <div className={styles.scholarshipTimelineDate}>June 30, 2025</div>
                    <div className="desc">Final Date for submission of applications</div>
                </div>
                <div className="col-2">
                    <div className={styles.timelineOrder}>3</div>
                    <div className={styles.scholarshipTimelineDate}>July 20, 2025</div>
                    <div className="desc">Scholarship Committee Notice to awarded applicants</div>
                </div>
                <div className="col-2">
                    <div className={styles.timelineOrder}>4</div>
                    <div className={styles.scholarshipTimelineDate}>July 31, 2025</div>
                    <div className="desc">Scholarship Delivery</div>
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipAboutLaso = () => (
    <section id={styles.scholarshipAboutLaso}>
        <div className="container py-4 text-center">
            <div className="row justify-content-center">
                <div className="col-4 justify-content-center">
                    <h2>About Luis Martinez de Bartolomé, &#34;Laso&#34;</h2>
                </div>
            </div>
            <div className="row justify-content-center"><div className={styles.lasoUnderTitle}></div></div>
            <div className="row justify-content-center">
                <div className="col-7">
                    <p>
                        Laso co-founded the Conan project and was a highly esteemed member of the software development
                        community.
                        Renowned for his exceptional technical talent, he could swiftly master new technologies and develop
                        comprehensive solutions within hours.
                        Beyond his professional prowess, Laso was celebrated for his authentic smile and unwavering honesty,
                        traits that endeared him to colleagues and friends alike.
                        His work has profoundly influenced global software development practices, particularly in the C and
                        C++ domains,
                        impacting numerous organizations and improving the lives of millions.
                        Laso&#39;s legacy continues to inspire those who had the privilege of knowing him.
                    </p>
                </div>
            </div>
            <div className="row justify-content-center">
                <ScholarshipApplyBtn/>
            </div>
        </div>
    </section>
);

const ScholarshipFooter = () => (
    <section id={styles.scholarshipFooter}>
        <div className="container py-4 text-center">
            <div className="row justify-content-center">
                <div className="col-12 justify-content-center">
                    May his memory be for a blessing
                </div>
            </div>
        </div>
    </section>
);

const ScholarshipEnded = () => (
  <section id={styles.scholarshipSummary} style={{"overflow": "hidden"}}>
    <div className="container pt-4">
      <div className="row">
        <div className={`col-8 ${styles.scholarshipSummaryCard}`}>
          <div className="row">
            <div className="col-8">
              <h2 style={{textTransform: "none"}}>The LASO Scholarship</h2>
              <h3>In memory of Luis Martinez de Bartolomé, &#34;Laso&#34;</h3>
              <p>
                The LASO Scholarship was created in memory of Luis Martinez de Bartolomé, affectionately known as &#34;Laso&#34;.
              </p>
              <p>
                The scholarship application period <b>is now closed</b>. Stay tuned for our next opening.
              </p>
              <div className="d-block d-md-none align-content-center">
                <img alt="Laso portrait" src="/laso/laso.png"
                     style={{"maxWidth": "none", "width": "400px"}}/>
              </div>
            </div>
            <div className="col-md-3 d-none d-md-block align-content-end overflow-visible">
              <img alt="Laso portrait" src="/laso/laso.png"
                   style={{"maxWidth": "none", "marginLeft": "100px", "width": "400px"}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const LasoScholarship = () => (
    <div id={styles.scholarshipContents}>
        <ScholarshipEnded/>
        {/*<ScholarshipSummary/>*/}
        {/*<ScholarshipDescription/>*/}
        {/*<ScholarshipProcess/>*/}
        {/*<ScholarshipApplication/>*/}
        {/*<ScholarshipTimeline/>*/}
        {/*<ScholarshipAboutLaso/>*/}
        {/*<ScholarshipFooter/>*/}
    </div>
);
