import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=Cap-Haïtien,Saint-Marc,Port-au-Prince,Gonaives"
  );
  //console.log(data);
  return (
    <div className="featured">
      {loading ? ("Loading please wait...") : <>
        <div className="featuredItem">
          <img
            src="https://t-cf.bstatic.com/xdata/images/city/square250/809042.webp?k=45b3c5e8fe2d90fed61eb6122b3b7e66ad42a3d2da22f4b4acaf8880d9efe302&o="
            alt=""
            className="featuredImage"
          />
          <div className="featuredText">
            <h1>Cap-Haïtien</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://t-cf.bstatic.com/xdata/images/city/square250/847558.webp?k=d58b1bce944df6d9d050cd5ab242126188344c093d4227f865cca5db33bed79b&o="
            alt=""
            className="featuredImage"
          />
          <div className="featuredText">
            <h1>Saint-Marc</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://t-cf.bstatic.com/xdata/images/city/square250/948488.webp?k=0f8704eac665fd77880004840598e31e480bb820a3eb9299633415d5a8a9bf28&o="
            alt=""
            className="featuredImage"
          />
          <div className="featuredText">
            <h1>Port-au-Prince</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://t-cf.bstatic.com/xdata/images/city/square250/753284.webp?k=e619e1bc27e7e14244743e0359900da1a2b2244017715ddb88738f4b9ceb8d00&o="
            alt=""
            className="featuredImage"
          />
          <div className="featuredText">
            <h1>Gonaives</h1>
            <h2>{data[3]} properties</h2>
          </div>
        </div>
      </>}
    </div>
  );
};

export default Featured;
