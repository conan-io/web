import React from 'react';
import { ConanKitchenHeader, ConanFooter } from '@/components';
import Link from 'next/link'

interface UserStory {
    title: string,
    description: string,
    url: string,
    imgSrc: string,
    imgSrcS: string
}

const UserStoryCards = (props: { data: UserStory[] }) => (
  <div className="row">
    {props.data && props.data.map(
      (info) => (
        <div key={info.title} className="col-md-3">
          <Link href={info.url}>
            <div className="single-user-story">
              <div className="image p-3 d-flex justify-content-center align-items-center bg-bright-gray" style={{height:"200px"}}>
                <img src={info.imgSrc} alt={info.title} className="w-auto mh-100 h-auto"></img>
              </div>
              <div className="title text-center bg-bright-blue p-2 d-flex justify-content-center align-items-center">
                <span className="text-white">{info.title}</span>
              </div>
              <p className="p-3 text-center">
                {info.description}
              </p>
            </div>
          </Link>
        </div>)
      )
    }
  </div>
)

const UserStoriesPage = () => {

  const data: UserStory[] = [
    {
      title: "RTI Story",
      description: "Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory",
      url: "user-stories/rti",
      imgSrc: "/user-stories/rti-m.png",
      imgSrcS: "/user-stories/rti-s.png"
    },
    {
      title: "Customer Success Story: TomTom",
      description: "TomTom fast tracks their delivery cycle with Conan",
      url: "user-stories/tomtom",
      imgSrc: "/user-stories/tomtom-m.png",
      imgSrcS: "/user-stories/tomtom-s.png"
    }
  ]

  return (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <section className="user-stories-section py-2">
          <div className="container py-5">
            <h1 className="text-center pb-5">User Stories</h1>
            <UserStoryCards data={data}/>
          </div>
        </section>
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default UserStoriesPage
