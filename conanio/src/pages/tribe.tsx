import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import { TRIBE_MEMBERS, type TribeMember } from "@/data/tribeMembers";
import styles from "@/styles/contentPages.module.css";
import Image from "next/image";

function normalizeExternalHref(url: string): string {
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u.replace(/^\/+/, "")}`;
}

const TRIBE_DEFAULT_AVATAR = "/conan-frog-tribe.png";

function TribeMemberCard({ member }: { member: TribeMember }) {
  const isDefaultAvatar = !member.image;
  const imgSrc = member.image ?? TRIBE_DEFAULT_AVATAR;
  return (
    <article className="tribe-card">
      <div className={`tribe-card-photo${isDefaultAvatar ? " tribe-card-photo--default" : ""}`}>
        <Image
          src={imgSrc}
          alt={member.name}
          width={278}
          height={252}
          unoptimized={isDefaultAvatar}
        />
      </div>
      <div className="tribe-card-body">
        <h3 className="tribe-card-name">{member.name}</h3>
        {member.company ? <p className="tribe-card-co">{member.company}</p> : null}
        <p className="tribe-card-desc">{member.description}</p>
        {(member.linkedin || member.x) && (
          <ul className="tribe-card-social">
            {member.linkedin ? (
              <li>
                <a
                  href={normalizeExternalHref(member.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Image src="/social/linkedin.svg" alt="" width={22} height={22} />
                </a>
              </li>
            ) : null}
            {member.x ? (
              <li>
                <a href={member.x} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on X`}>
                  <Image src="/social/x-black.svg" alt="" width={22} height={22} />
                </a>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function TribePage() {
  return (
    <>
      <PageHead title="Conan — The Conan 2.0 Tribe" />

      <main id="page" className={styles.tribePage} data-screen-label="Conan Tribe">
        <MainNav />

        <section className="tribe-hero" aria-labelledby="tribe-hero-title">
          <div className="tribe-hero-inner">
            <div className="tribe-hero-layout">
              <div className="tribe-hero-text">
                <h1 id="tribe-hero-title">The Conan 2.0 Tribe</h1>
              </div>
              <div className="tribe-hero-visual" aria-hidden>
                <Image src="/tribe-frogs.png" alt="" width={620} height={340} loading="eager" />
              </div>
            </div>
          </div>
        </section>

        <section className="tribe-intro" id="tribesContent">
          <p className="tribe-lead">
            <strong>
              The Conan 2.0 Tribe is a group of more than 70 Conan expert users and contributors that has helped to define Conan 2.0.{" "}
              <br />
              Their feedback has been of great value to the critical decisions that have been taking place during the development of Conan 2.0.
            </strong>
          </p>
          <p>
            Conan 2.0 Tribe members are active Conan users and contributors from some of the most relevant companies and organizations worldwide which have
            volunteered to provide quality feedback in a consistent and unbiased way. These professionals develop software for industries such as aerospace,
            finance, automotive, healthcare, and entertainment.
          </p>
          <h2>How does the Conan tribe work?</h2>
          <p>
            Most of the interactions of the tribe are open and take place in the{" "}
            <a href="https://github.com/conan-io/tribe" target="_blank" rel="noopener noreferrer">
              Conan Tribe Github
            </a>{" "}
            repository. Here, the issues regarding vital decisions for the future of Conan have been be discussed and voted upon. Although anyone could to
            comment, the number of upvotes and downvotes of only the members of the tribe is heavily weighted towards the final decision. We discussed items
            of impact in Conan 2.0, such as improving Conan&apos;s graph model, changing defaults, or modernizing build system toolchains and practices.
          </p>
          <h2>Is it possible to become a member of the tribe?</h2>
          <p>
            Now that Conan 2.0 is GA, we will discuss with the Tribe the way going forward for strategic changes to Conan, future major 3.0, 4.0 versions,
            etc. We will also talk about the Tribe itself and there will be opportunities to join. In the meantime, everybody is welcome to give feedback in
            the{" "}
            <a href="https://github.com/conan-io/tribe" target="_blank" rel="noopener noreferrer">
              Conan Tribe Github
            </a>{" "}
            repository and contact the maintainers at{" "}
            <a href="mailto:tribe-maintainers@conan.io">tribe-maintainers@conan.io</a>.
          </p>
        </section>

        <section className="tribe-members-section" id="theTribe" aria-labelledby="tribe-members-heading">
          <h2 id="tribe-members-heading">Meet the Conan tribe:</h2>
          <div className="tribe-grid">
            {TRIBE_MEMBERS.map((member, index) => (
              <TribeMemberCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        </section>

        <MainFooter />
      </main>
    </>
  );
}
