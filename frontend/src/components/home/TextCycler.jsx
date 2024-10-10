import React, { useState, useEffect } from 'react';
var index = 0;

const TextCycler = () => {
  const [displayText, setDisplayText] = useState('|');
  const texts = ["DNA Sequencing", "Polymers", "Algorithms", "Network", 
            "Artificial Intelligence", "Machine Learning", "Nanotechnology", 
            "Quantum Computing", "Renewable Energy", "Climate Change", 
            "Robotics", "Biotechnology", "Cybersecurity", "Genomics", 
            "Bioinformatics", "Big Data", "Internet of Things", 
            "Blockchain", "Data Mining", "Cognitive Computing", 
            "Wireless Communications", "Immunology", "Pharmacology", 
            "Astrophysics", "Materials Science", "Neuroscience", 
            "Microbiology", "Environmental Science", "Computational Biology", 
            "Cryptography"];
  const fixedText = "Search for\n";
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Delete text
      if (displayText.length > 1) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Change to the next text
        index = (index + 1) % texts.length;
        setDisplayText(texts[index]);
        // console.log(index);
      }
    }, 200); // Adjust the interval time as needed

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [displayText, texts]);

  return (
    <div>
      <p style={{lineHeight: "1.2"}}>{fixedText} <br /> {displayText}</p>
    </div>
  );
};

export default TextCycler;
