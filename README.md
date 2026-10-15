Länk till ToDo list: https://mydailyto-do.netlify.app/ 
## 📝 Sammanfattning av projekt
### Introduktion
Jag har byggt en todo-lista med TypeScript, Vite och npm. Applikationen låter användare hantera uppgifter genom att lägga till, redigera, markera som klara, filtrera och ta bort todos. All data sparas i localStorage så att uppgifterna finns kvar när man laddar om sidan.
Projektet är uppdelat i fyra delar: **models** (Todo-interface för hur data ska se ut), **services** (TodoService med all logik), **styles** (CSS med mobile-first design), och **main.ts** (UI och knappar). Denna struktur gör koden lättare att läsa och ändra.

### 🛠️ Verktyg och teknologier 
Kravet för projektet var att använda vite som är ett bra byggverktyg eftersom det är snabbt och fungerar bra med TypeScript. NPM användes för att installera paket, till exempel UUID-biblioteket som skapar unika ID:n för varje todo. TypeScript hjälpte mig att hitta fel tidigt genom att kräva tydliga datatyper, vilket sparade mycket tid vid felsökning.

### Projektstruktur
Todo-interfacet definierar hur en todo ska se ut (id, text, completed). Detta gör att TypeScript kan kontrollera att jag inte gör fel. TodoService innehåller alla funktioner för att lägga till, ta bort och uppdatera todos, samt spara till localStorage. Main.ts hanterar bara UI och lyssnar på användarens klick. Jag använde event delegation för att hantera knappar som skapas dynamiskt.
CSS följde mobile-first, vilket betyder att jag designade för mobil först och sedan lade till media queries för större skärmar (1200px+). Designen fungerar på alla enheter med ett dark mode-tema och animerad gradient-bakgrund.

### Styrkor och brister
Styrkor är tydlig filstruktur och TypeScript-typning, responsiv design som fungerar på alla skärmar, och logiken är väl uppdelad mellan olika filer.
Med hjälp av tillgänglighetsverktyg såsom contrast checker upptäcker jag några brister. En av bristerna är svag färgkontrast på vissa element vilket kan göra det svårt att läsa för personer med synproblem. Det finns inte heller visuell feedback när något går fel men i nuläget fungerar koden så har inga konkreta exempel på vad som kan gå fel. 

### Sammanfattning
Projektet visar att jag kan bygga moderna webbappar med TypeScript, strukturerad kod och responsiv design. Med förbättringar i tillgänglighet och felhantering skulle appen vara redo för produktion.


## Teoretiska frågor 
**1. Vad är TypeScript och varför använder man det istället för vanlig JavaScript?**

TypeScript är som en "storebror" till JavaScript. Det är i grunden JavaScript, men med ett extra lager av säkerhet: typer.

I vanliga JavaScript vet datorn inte om en variabel är ett namn (text) eller ett pris (nummer) förrän programmet faktiskt körs. Detta leder ofta till buggar. TypeScript låter dig bestämma reglerna i förväg.

Varför använda det istället för JavaScript?

* Hitta fel tidigt: TypeScript varnar dig direkt medan du skriver koden om du försöker göra något logiskt fel.

* Bättre verktyg: Kodredigerare (som VS Code) förstår din kod bättre och kan ge dig smartare förslag (autocomplete).

* Lättare att läsa: När du ser koden förstår du direkt vilken sorts data som används.

**2. Förklara skillnaden mellan unknown, any och en specifik typ som string. När bör man använda de olika typerna?**

* **String (specifik typ):**
En specifik typ säger exakt vad något är. Om en variabel är av typen string kan den bara innehålla text exempelvis:

let name: string = "Anna";
name = 123; // Här blir det fel 

Med en specifik typ vet TypeScript exakt vilka operationer som är tillåtna. På en string kan man använda .toUpperCase(), .length osv.

* **Any**

any stänger av all typkontroll. När man använder any säger man till TypeScript "vad som helst"

Ex. 

let data: any = "text";
data = 123;        // ✅ OK
data = true;       // ✅ OK
data.anything();   // ✅ OK (även om metoden inte finns)

Any används sällan. Det kan vara motiverat när man arbetar med gammalt JavaScript-bibliotek som inte har typdefinitioner, men generellt bör man undvika any.

* **Unknown**
  
unknown betyder också "vad som helst", men på ett säkert sätt. TypeScript låter dig inte använda variabeln förrän du har kontrollerat vad det faktiskt är (t.ex. med en if-sats).

unknown kan användas när du får data från en källa du inte kontrollerar (exempelvis API, local storage eller ett formulär) och du vill vara försiktig.


**3. Vad är syftet med att använda types/interfaces i TypeScript? Varför är de viktiga när man bygger större projekt?**

I TypeScript använder en type och interface för att skapa egna mallar för hur objekt ska ut. Alltså definiera strukturen på objekt och data.
Ett exempel finns i mitt to-do projekt:

**export interface Todo {**

**id: string;**

**text: string;**

**completed: boolean;**

**}**

Detta interface säger: "En Todo måste alltid ha dessa tre properties med dessa typer." Nu kan jag använda Todo överallt i projektet.

I större projekt är de viktiga för att:

**Sätta gemensamma regler:** I ett stort projekt jobbar många programmerare tillsammans. Ett interface fungerar som ett kontrakt. Alla vet exakt hur en "produkt" ser ut, vilket minskar missförstånd.

**Enklare att ändra:** Om en behöver lägga till "färg" på alla produkter så ändrar en det på ett ställe (i interface). TypeScript visar en då direkt alla platser i hela projektet som behöver uppdateras.

**Dokumentation:** Istället för att läsa långa dokument kan en nyanställd programmerare bara titta på ens types för att förstå hur systemet är uppbyggt.