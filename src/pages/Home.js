import CalendarComponent from "../components/CalendarComponent";
import OptionsComponent from "../components/OptionsComponent";

const Home = ({selectedZones, setSelectedZones, publicHolidays, setPublicHolidays}) => {
    
    return (
        <>
          <div className="options-container">
            <OptionsComponent selectedZones={selectedZones} setSelectedZones={setSelectedZones} publicHolidays={publicHolidays} setPublicHolidays={setPublicHolidays}/>
          </div>
          <div className="calendar-container">
            <title>Calendrier Réservation Chemin des Bridans</title>
            <CalendarComponent selectedZones={selectedZones} publicHolidays={publicHolidays}/>
          </div>
        </>
      );
}

export default Home;