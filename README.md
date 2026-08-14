# Evidencija osoba (Person CRUD)

Jednostavna React aplikacija za odrzavanje kolekcije osoba. Aplikacija komunicira sa
fake REST API-jem koji je napravljen preko **json-server**-a, i omogucava sve osnovne
HTTP operacije nad osobama: pregled, kreiranje, izmenu i brisanje.

---

## Sta aplikacija radi

Kada se aplikacija otvori u browseru, ona automatski povlaci listu svih osoba sa API-ja
i prikazuje ih u tabeli. Svaka osoba ima sledeca obelezja:

| Polje | Opis |
|---|---|
| `id` | jedinstveni identifikator (dodeljuje ga json-server) |
| `name` | ime |
| `surname` | prezime |
| `userType` | tip korisnika (npr. Administrator, Korisnik, Menadzer, Gost) |
| `createdDate` | datum kreiranja |
| `city` | grad |
| `address` | adresa |

### Funkcionalnosti

**1. Prikaz svih osoba**
Sve osobe se prikazuju u tabeli sa svim kolonama. Podaci se ucitavaju sa API-ja pri
otvaranju stranice.

**2. Filtriranje**
Iznad tabele se nalaze dva filtera:

- **Pretraga po imenu** — tekstualno polje. Prikazuju se sve osobe cije ime **pocinje**
  vrednoscu koja je uneta u polje. Pretraga ne razlikuje velika i mala slova, pa
  `mar` pronalazi i `Marko` i `Marija`.
- **Tip korisnika** — dropdown. Vrednosti u dropdown-u **nisu zakucane u kodu**, nego se
  dinamicki izvlace iz same liste osoba. Ako se doda osoba sa novim tipom, taj tip se
  odmah pojavi i u dropdown-u. Opcija `Svi tipovi` iskljucuje ovaj filter.

Filteri rade zajedno — ako se unese deo imena i izabere tip, vracaju se samo osobe tog
tipa cije ime pocinje unetom vrednoscu. Ako nijedna osoba ne zadovoljava kriterijume,
umesto tabele se ispisuje poruka **„Ne postoji rezultat za zadate kriterijume pretrage."**

**3. Kreiranje nove osobe**
Dugme `Nova osoba` otvara Fluent `Dialog` sa praznom formom. Ako je neko polje prazno,
prikazuje se poruka i zahtev se ne salje. Nakon cuvanja salje se `POST` zahtev,
dialog se zatvara i tabela se osvezava.

**4. Izmena osobe**
Dugme `Izmeni` u redu tabele otvara isti modal, ali popunjen podacima te osobe. Nakon
cuvanja salje se `PUT` zahtev i tabela se osvezava.

**5. Brisanje osobe**
Dugme `Obrisi` trazi potvrdu, a zatim salje `DELETE` zahtev i osvezava tabelu.

> **Napomena o validaciji:** Fluent-ov `required` na `TextField`-u samo prikazuje
> zvezdicu pored labele — on **ne zaustavlja** cuvanje. Zato se prazna polja
> proveravaju rucno u `handleSave` i greska se prikazuje kroz `MessageBar`.

### Izgled

Interfejs je podeljen na tri dela:

- **Header** u zaglavlju sa naslovom aplikacije
- **Navigacija** sa leve strane, sa tri linka (`Osobe`, `Izvestaji`, `Podesavanja`).
  Link `Osobe` je stalno aktivan i vizuelno se razlikuje od ostala dva — ima tamnu
  pozadinu, bela slova, podebljan tekst i narandzastu liniju sa leve strane.
- **Content** sa desne strane, gde se nalaze dugme za dodavanje, filteri i tabela.

---

## Tehnologije

- **React 18** (create-react-app / react-scripts)
- **Fluent UI React v8** (`@fluentui/react`) — UI komponente
- **axios** — komunikacija sa API-jem
- **json-server** — fake REST API

### Koje Fluent UI komponente se koriste

| Komponenta | Gde |
|---|---|
| `ThemeProvider` | omotava celu aplikaciju u `index.js` |
| `Stack` / `Stack.Item` | raspored stranice i razmaci izmedju filtera |
| `Nav` | leva navigacija sa tri linka |
| `Text` | naslovi i pomocni tekst |
| `DetailsList` | tabela sa osobama |
| `TextField` | polje za pretragu i sva polja forme |
| `Dropdown` | filter po tipu korisnika |
| `Dialog` / `DialogFooter` | modal za kreiranje i izmenu |
| `PrimaryButton` / `DefaultButton` | dugmad |
| `MessageBar` | poruka kada nema rezultata i greska u formi |

Obican CSS je ostao samo za ono sto Fluent ne pokriva — raspored stranice,
zaglavlje i pozadinu leve navigacije ([App.css](src/App.css)).

---

## Struktura projekta

```
.
├── db.json                     # baza za json-server (kolekcija persons)
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js                # ulazna tacka, ThemeProvider + initializeIcons
    ├── index.css
    ├── App.js                  # glavna komponenta - state, API pozivi, filtriranje
    ├── App.css                 # ono malo CSS-a koje Fluent ne pokriva
    └── components/
        ├── Header.js           # zaglavlje
        ├── Navigation.js       # leva navigacija (Nav) sa 3 linka
        ├── Filters.js          # TextField za ime + Dropdown za tip korisnika
        ├── PersonTable.js      # DetailsList sa dugmadima Izmeni/Obrisi
        └── PersonForm.js       # Dialog forma za kreiranje i izmenu
```

---

## Pokretanje

### Preduslovi

Potrebno je da bude instaliran **Node.js** (verzija 18 ili novija). Uz Node.js
automatski dolazi i **npm**.

Provera da li je instaliran:

```bash
node --version
```

```bash
npm --version
```

Ako komande ne rade, Node.js se skida sa <https://nodejs.org> (LTS verzija).

### 1. Skidanje projekta

```bash
git clone <url-repozitorijuma>
```

Zatim se ulazi u folder projekta:

```bash
cd <ime-foldera>
```

### 2. Instalacija zavisnosti

```bash
npm install
```

Ova komanda skida sve pakete navedene u `package.json` i pravi folder `node_modules`.
Pokrece se samo jednom, prvi put.

### 3. Pokretanje fake API-ja

Aplikaciji je potreban json-server. On se pokrece u **posebnom terminalu** i mora da
radi sve vreme dok se koristi aplikacija:

```bash
npm run api
```

API tada radi na `http://localhost:3001`, a kolekcija osoba je dostupna na
`http://localhost:3001/persons`.

### 4. Pokretanje React aplikacije

U **drugom terminalu** (prvi ostaje otvoren sa json-server-om):

```bash
npm start
```

Aplikacija se otvara na `http://localhost:3000`.

> **Vazno:** oba terminala moraju da rade istovremeno. Ako json-server nije pokrenut,
> tabela ce ostati prazna jer aplikacija ne moze da dobije podatke.

---

## API rute

json-server na osnovu `db.json` automatski pravi sledece rute:

| Metoda | Ruta | Opis |
|---|---|---|
| `GET` | `/persons` | vraca sve osobe |
| `GET` | `/persons/1` | vraca osobu sa id-jem 1 |
| `POST` | `/persons` | kreira novu osobu |
| `PUT` | `/persons/1` | menja osobu sa id-jem 1 |
| `DELETE` | `/persons/1` | brise osobu sa id-jem 1 |

Sve rute se mogu testirati i kroz **Postman**.

---

## Napomene

- Svaka izmena kroz aplikaciju (dodavanje, izmena, brisanje) trajno menja fajl `db.json`,
  jer json-server taj fajl koristi kao bazu.
- `id` se ne unosi rucno — json-server ga sam dodeljuje pri kreiranju nove osobe.
- Za produkcijski build koristi se `npm run build`, koji pravi folder `build/`.
