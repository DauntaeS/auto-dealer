import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">AutoDealer</h1>
      <Link to="/automobiles">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/10best-cars-group-cropped-1542126037.jpg"
          height="500"
        />
      </Link>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Click the image </p>
      </div>
    </div>
  );
}

export default MainPage;
