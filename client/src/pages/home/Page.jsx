import { useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import useAppContext from "../../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setResume } = useAppContext();
  const navigate = useNavigate();

  // updates the state with user's input
  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  // removes a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  // updates an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.data);
          setResume(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-center">
        DOJ AI - Resume Builder
      </h1>
      <p className="text-sm text-center font-semibold mb-6 mt-1">
        Generate a resume with DOJ AI in seconds without any hassle
      </p>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Enter your full name
          </label>
          <input
            className="form-input"
            type="text"
            required
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex gap-3 my-2">
          <div>
            <label htmlFor="currentPosition" className="form-label">
              Current Position
            </label>
            <input
              className="form-input"
              type="text"
              required
              name="currentPosition"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentLength" className="form-label">
              For how long? (year)
            </label>
            <input
              className="form-input"
              type="number"
              required
              name="currentLength"
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentTechnologies" className="form-label">
              Technologies used
            </label>
            <input
              type="text"
              className="form-input"
              required
              name="currentTechnologies"
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="photo" className="form-label">
          Upload your headshot image
        </label>
        <input
          className="form-input"
          type="file"
          name="photo"
          required
          id="photo"
          accept="image/x-png,image/jpeg"
          onChange={(e) => setHeadshot(e.target.files[0])}
        />

        <h3 className="text-lg font-semibold my-3">
          Companies you have worked at
        </h3>
        {companyInfo.map((company, index) => (
          <div className="flex gap-3" key={index}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Company Name
              </label>
              <input
                className="form-input"
                type="text"
                name="name"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="companies">
              <label htmlFor="position" className="form-label">
                Position Held
              </label>
              <input
                className="form-input"
                type="text"
                name="position"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>

            <div className="self-center">
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button
                  className="bg-green-400 p-2 mt-3 w-12 h-full text-sm rounded-sm mr-1"
                  id="addBtn"
                  onClick={handleAddCompany}
                >
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button
                  className="bg-red-400 p-2 mt-3 w-12 text-sm rounded-sm"
                  id="deleteBtn"
                  onClick={() => handleRemoveCompany(index)}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="mt-4 bg-cyan-900 p-3 w-full text-white rounded-sm">
          CREATE RESUME
        </button>
      </form>
    </div>
  );
};

export default HomePage;
