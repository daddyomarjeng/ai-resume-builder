import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useAppContext from "../../../hooks/useAppContext";
import ResumeErrorPage from "./Error";

// function that replaces the new line with a break tag
const replaceWithBr = (string) => {
  return string.replace(/\n/g, "<br />");
};

const ResumePage = () => {
  const { resume } = useAppContext();
  const mainRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => mainRef.current,
    documentTitle: `${resume.fullName} Resume`,
    onAfterPrint: () => alert("Print Successful!"),
  });

  if (JSON.stringify(resume) === "{}") {
    return <ResumeErrorPage />;
  }

  return (
    <>
      <button
        className="absolute left-6 bg-[#661616] text-white p-3 rounded-md text-lg font-semibold"
        onClick={handlePrint}
      >
        Print Page
      </button>
      <main
        className="container max-w-screen-md mx-auto border mb-2 pb-2 mt-4"
        ref={mainRef}
      >
        <header className="bg-gray-300 px-6 flex justify-between items-center py-5">
          <div className="text-sm">
            <h1 className="font-semibold">{resume.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {resume.currentPosition} ({resume.currentTechnologies})
            </p>
            <p className="resumeTitle">
              {resume.currentLength}year(s) work experience
            </p>
          </div>
          <div className="">
            <img
              src={resume.image_url}
              alt={resume.fullName}
              className="h-14 w-14 rounded-full"
            />
          </div>
        </header>
        <div className="px-4 text-xs leading-5">
          <div>
            <h2 className="resumeBodyTitle">PROFILE SUMMARY</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resume.description),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">WORK HISTORY</h2>
            {resume.workHistory.map((work) => (
              <p className="resumeBodyContent" key={work.name}>
                <span style={{ fontWeight: "bold" }}>{work.name}</span> -{" "}
                {work.position}
              </p>
            ))}
          </div>
          <div>
            <h2 className="resumeBodyTitle">JOB PROFILE</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resume.jobResponsibilities),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">JOB RESPONSIBILITIES</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resume.keypoints),
              }}
              className="resumeBodyContent"
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default ResumePage;
