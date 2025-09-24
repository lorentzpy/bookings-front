import React, { useState, useEffect, useRef } from "react";
import fetchZoneCities from "../api/fetchZoneCities";
import { useAuth } from "../context/authContext";
import saveUserPrefs from "../api/savePrefs";

//const apiUrl = process.env.REACT_APP_API_URL;

const OptionsComponent = ({selectedZones, setSelectedZones, publicHolidays, setPublicHolidays}) => {

    const [zoneCities, setZoneCities] = useState({});
    
    const zones = ["A", "B", "C"];

    const { user } = useAuth();

    const userIdRef = useRef(user);
    
    useEffect(() => {
        const loadData = async () => {
          const data = await fetchZoneCities(); // doit retourner un objet { "Zone A": [...], ... }
          setZoneCities(data);
        };
        loadData();
      }, []);

      useEffect(() => { 
        const payload = {"$set": {"prefs.zones": selectedZones}};
        saveUserPrefs(userIdRef.current, payload);        

      }, [selectedZones]);

      useEffect( () => {
        const payload = {"$set": {"prefs.public_holidays":publicHolidays}};
        saveUserPrefs(userIdRef.current, payload);
      }, [publicHolidays]);

    const handleCheckboxChange = (zone) => {
        setSelectedZones((prev) => {
          const newZones = prev.includes(zone)
            ? prev.filter((z) => z !== zone) // décocher
            : [...prev, zone]
            
            //handleSavePrefs(newZones);
            return newZones;
        });        
    };

    const handleCheckboxPubHolChange = () => {
        setPublicHolidays((prev) => !prev);
    };

    return (
        <div className="checkbox-row">
            {zones.map( (zone) => (
                <div key={zone}>
                    <input                    
                    type="checkbox"
                    id={`zone_${zone}`}
                    checked={selectedZones.includes(zone)}
                    onChange={() => handleCheckboxChange(zone)}
                    title={`${zoneCities[`Zone ${zone}`]?.join(', ')}`}
                    />
                    <label className="checkbox-opts" htmlFor={`zone_${zone}`} title={`${zoneCities[`Zone ${zone}`]?.join(', ')}`}>Zone {zone}</label>
                </div>
                )                        
            )}
            <div key="pubholidays">
                <input
                type="checkbox"
                id="pubholidays"
                checked={publicHolidays}
                onChange={() => handleCheckboxPubHolChange()}
                />
                <label className="checkbox-opts" htmlFor="pubholidays" title="Jours feriés">Jours fériés</label>
            </div>
          
        </div>
    );

}

export default OptionsComponent;