interface Card3dProps {
  src: string;
}
function Card3d({ src }: Card3dProps) {
  console.log(src);
  return (
    <div className="hover-3d">
      {/* content */}
      <figure className="max-w-100 rounded-2xl">
        <img src={`${src}`} alt="3D card" />
      </figure>
      {/* 8 empty divs needed for the 3D effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Card3d;
