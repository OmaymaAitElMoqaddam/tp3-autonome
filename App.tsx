import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text, View } from 'react-native';
type Evenement={
  id: string,
  titre: string,
  categorie: string,
  capacite: number,
  inscrit: number,
};
const evenements: Evenement[]=[
  { id: "E01", titre:"Atelier React",categorie: "Atelier",capacite: 25, inscrit: 25},
  {id: "E02", titre:"Conférence IA",categorie: "Conférence",capacite: 70, inscrit: 52 },
  {id: "E03", titre:"Sécurité mobile",categorie: "Atelier",capacite: 20, inscrit: 17 },
  {id: "E04", titre:"Desing UI",categorie: "Atelier",capacite: 18, inscrit: 9, },
  {id: "E05", titre:"Forum projets",categorie: "Rencontre",capacite: 50, inscrit: 49 },
  {id: "E06", titre:"Découverte Git",categorie: "Atelier",capacite: 24, inscrit: 24 },
];
function placesRestantes(e: Evenement):number{
  const r = e.capacite - e.inscrit;
  return(
    r > 0 ? r : 0
  )
}
function statutEvenement(e: Evenement){
  const r = placesRestantes(e);
  if (r===0){
    return 'Complet';
  }else
  if ( r <= 3 ){
    return 'Presque complet';
  }else{
    return 'Ouvert'
  }
}
const nombretotalévénements=evenements.length;
const nombrecomplets= evenements.filter((e)=>{
  return placesRestantes(e) === 0;
}).length;
const evenementsavecplace=evenements.filter((e)=>{
  return placesRestantes(e) > 0;
}).length
const sommeplaces=evenements.reduce((somme , e)=>{
  return placesRestantes(e) + somme;
},0);
const ateliersDisponibles = evenements.filter(
  (e) => e.categorie === "Atelier" && placesRestantes(e) > 0
);
type BadgeProps= {statut:string};
function BadgeEtat({statut}: BadgeProps){
  let coleur = "orange";
  if (statut === "Complet") {
    coleur = "red";
  } 
  else if (statut === "Ouvert") {
   coleur = "green";
  }
  return (
    <View style={[styles.badge,{backgroundColor:coleur}]}>
      <Text>{statut}</Text>
    </View>
  );
}
type CarteProps = { evenements: Evenement };
function CarteEvenements({ evenements }: CarteProps) {
 return (
   <View style={styles.carte}>
    <View style={styles.informations}>
      <Text style={styles.titre}>{evenements.titre}</Text>
      <Text style={styles.categorie}>{evenements.categorie}</Text>
      <Text style={styles.placesRestantes}>{placesRestantes(evenements)}place restantes</Text>
    </View>
    <BadgeEtat statut={statutEvenement(evenements)} />
   </View>
 );
}
type Blocprops={libelle:string,nombre:number};
function BlocStatistique({libelle,nombre}:Blocprops){
  return(
    <View style={styles.bloc}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.libelle}>{libelle}</Text>
    </View>
    )

}
const mode = "tous";
export default function App(){
  return (
    <View style={styles.container}>
 <FlatList
        data={evenements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenements evenements={item} />
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.titre}>CampusAgenda</Text>
              <Text style={styles.soustitre}>événement de campus</Text>
            </View>

            <View style={styles.statistiques}>
              <BlocStatistique
                libelle="Événement totales"
                nombre={nombretotalévénements}
              />

              <BlocStatistique
                libelle="Complets"
                nombre={nombrecomplets}
              />

              <BlocStatistique
                libelle="Avec places"
                nombre={evenementsavecplace}
              />

              <BlocStatistique
                libelle="Places libres"
                nombre={sommeplaces}
              />
            </View>

            <Text style={styles.titreSection}>
              Tous les événements
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun événement disponible
          </Text>
        }
        ListFooterComponent={
          <View>
            <Text style={styles.titreSection}>
              Ateliers avec places
            </Text>

            {ateliersDisponibles.map((item) => (
              <CarteEvenements
                key={item.id}
                evenements={item}
              />
            ))}
          </View>
        }
        contentContainerStyle={styles.contenu}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contenu: {
    padding: 15,
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 12,
    marginBottom: 15,
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  soustitre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222"
  },
  statistiques: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bloc: {
    width: "48%",
    backgroundColor: "white",
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  nombre: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222",
  },
  libelle: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
  },
  titreSection: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
    color: "#222",
  },
  carte: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  informations: {
    flex: 1,
    marginRight: 8,
  },
  titreCarte: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  categorie: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
  },
  placesRestantes: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  badge: {
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 15,
  },
  texteBadge: {
    fontSize: 11,
    fontWeight: "bold",
  },
  messageVide: {
    textAlign: "center",
    marginTop: 30,
    color: "gray",
  },
});