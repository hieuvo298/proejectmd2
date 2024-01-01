import './banner1.css'
const Banner1=()=>{
    return(
        <>
  <div className="header-banner">
    <img
      src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1824,c_limit/11ff874b-e718-4634-a8fe-be0712524133/nike-just-do-it.png"
      alt="anh"
    />
    <h1>GIFTS THAT MOVE YOU</h1>
    <p>This year's gift. Next year greatness</p>
    <button className="black-button">SHOP</button>
    <button className="black-button">Explore</button>
  </div>
  <h3>Don't Miss</h3>
  <section className="body-product">
    <div className="body-product-item">
      <figure>
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_541,c_limit/1bb013aa-fdf1-4f91-96ee-308733ee2fd3/image.png"
          alt="anh"
        />
      </figure>
      <figcaption>
        <h3> For Runners</h3>
      </figcaption>
    </div>
    <div className="body-product-item">
      <figure>
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_734,c_limit/6f956172-987d-4820-9fc9-0c37a9149a0e/image.png"
          alt="anh"
        />
      </figure>
      <figcaption>
        <h3>For Jordan</h3>
      </figcaption>
    </div>
    <div className="body-product-item">
      <figure>
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_735,c_limit/65bc9629-24d4-49d9-9b63-98b0a171073a/gifts-that-move-you-nike-com.png"
          alt="anh"
        />
      </figure>
      <figcaption>
        <h3>For Lifestyle</h3>
      </figcaption>
    </div>
  </section>
</>

    )
}
export default Banner1