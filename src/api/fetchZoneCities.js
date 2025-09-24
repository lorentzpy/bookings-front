const fetchZoneCities = async () => {
    const url = `https://data.education.gouv.fr/api/explore/v2.0/catalog/datasets/fr-en-calendrier-scolaire/records?limit=100&offset=0&timezone=Europe/Paris&where=annee_scolaire="2024-2025" and (zones="Zone A" or zones="Zone B" or zones="Zone C") and not population ="Enseignants"&select=location, zones&group_by=location, zones&sort=zones`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        var out = [];
        data.records.forEach( (row) => {
            var zone = row.record.fields.zones;
            var location = row.record.fields.location;
            
            if(!out[zone]) {
                out[zone] = [];
            }
            out[zone].push(location);
        });

    } catch {
        console.error("Error fetching data");
    }

    return out;

}

export default fetchZoneCities;