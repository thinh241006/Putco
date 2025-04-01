function Star({ img, name, points, categories, locations }) {
  return (
    <div className="text-left p-6 text-text-gray flex flex-col items-center">
      <img className="w-50 h-50 rounded-full object-cover" src={img} alt={name} />
        <h2 className="mt-5 text-2xl font-jua text-navbar text-center">{name}</h2>
        <div className="w-full text-justify pl-20">
        <p className="mt-2">TOTAL POINTS: <span className="font-bold">{points}</span></p>
        <p className="mt-1">CATEGORIES: <span className="font-medium">{categories}</span></p>
        <p className="mt-1">USUAL LOCATIONS: <span className="font-medium">{locations}</span></p>
      </div>
    </div>
  );
}

  
  export default Star;