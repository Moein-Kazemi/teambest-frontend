interface Card3dProps {
  src: string;
}
function Card3d({ src }: Card3dProps) {
  return (
    <div className="hover-3d col-span-12 sm:col-span-8">
      <figure className="max-w-200 rounded-2xl">
        <img src={`${src}`} alt="3D card" />
      </figure>
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
