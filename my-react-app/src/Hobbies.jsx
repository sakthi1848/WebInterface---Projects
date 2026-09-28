import "./Hobbies.css";

function Hobbies() {
  const hobbies = [
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      name: "Coding",
      description: "I love coding and creating websites."
    },
    {
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      name: "Gaming",
      description: "I enjoy playing games in my free time."
    },
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      name: "Music",
      description: "I love listening to music."
    }
  ];

  return (
    <div>
      <h1>My Hobbies</h1>

      <div className="hobby-container">
        {hobbies.map((hobby, index) => (
          <div className="hobby-card" key={index}>
            <img src={hobby.image} alt={hobby.name} />
            <h2>{hobby.name}</h2>
            <p>{hobby.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hobbies;