import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Informativa sulla Privacy
      </h1>

      <p className="mb-4">
        La presente informativa descrive come <strong>MyLoanMate</strong> tratta
        i dati personali degli utenti in conformità al Regolamento (UE) 2016/679
        (“GDPR”) e alla normativa nazionale applicabile.
      </p>

      {/* TITOLARE E CONTATTI */}
      <h2 className="text-xl font-semibold mt-6 mb-3">
        Titolare del trattamento
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="mb-2">
          <strong>MyLoanMate</strong> (di seguito, “Titolare”) determina le
          finalità e i mezzi del trattamento dei dati personali raccolti tramite
          l’applicazione.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div>
            <dt className="text-sm text-gray-500">Email Titolare</dt>
            <dd className="font-medium">
              <a href="mailto:privacy@loanmate.local" className="underline">
                privacy@myloanmate.local
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Sede legale</dt>
            <dd className="font-medium">
              <em>[indirizzo completo]</em>
            </dd>
          </div>
        </dl>
      </div>

      {/* CATEGORIE DI DATI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Categorie di dati trattati
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati identificativi e di contatto</p>
          <p className="text-sm text-gray-700 mt-1">
            Nome, cognome, email, telefono.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati anagrafici</p>
          <p className="text-sm text-gray-700 mt-1">
            Data/luogo di nascita, indirizzo, codice fiscale (se richiesto).
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati economico-finanziari forniti</p>
          <p className="text-sm text-gray-700 mt-1">
            Informazioni e documentazione per la richiesta di prestito (es.
            importo, reddito, occupazione).
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati tecnici</p>
          <p className="text-sm text-gray-700 mt-1">
            Log applicativi, IP, identificativi dispositivo, dati di
            autenticazione e sicurezza.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati derivati dall’uso</p>
          <p className="text-sm text-gray-700 mt-1">
            Stato delle richieste e cronologia operazioni dell’account.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="font-semibold">Dati da terze parti (ove applicabile)</p>
          <p className="text-sm text-gray-700 mt-1">
            Fornitori antifrode/AML-KYC o soggetti legittimati, nei limiti di
            legge.
          </p>
        </div>
      </div>

      {/* FINALITÀ E BASI GIURIDICHE */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Finalità e basi giuridiche
      </h2>
      <div className="space-y-4">
        <PurposeCard
          title="Creazione e gestione account, autenticazione e supporto"
          basis="Contratto/misure precontrattuali; legittimo interesse per sicurezza del servizio."
        />
        <PurposeCard
          title="Valutazione e gestione richieste di prestito"
          basis="Contratto; obbligo di legge; legittimo interesse alla prevenzione abusi."
          detail="Possibili controlli antifrode/AML-KYC ove richiesti."
        />
        <PurposeCard
          title="Adempimenti normativi e richieste dell’autorità"
          basis="Obbligo legale."
        />
        <PurposeCard
          title="Miglioramento del servizio e sicurezza"
          basis="Legittimo interesse del Titolare nel rispetto dei diritti degli interessati."
          detail="Analytics tecniche aggregate, monitoraggio performance."
        />
        <PurposeCard
          title="Comunicazioni di servizio"
          basis="Contratto/legittimo interesse."
          detail="Es. notifiche sullo stato della pratica."
        />
        <PurposeCard
          title="Marketing diretto e/o profilazione a fini marketing"
          basis="Solo previo consenso libero e revocabile in ogni momento."
        />
      </div>

      {/* CONFERIMENTO DATI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Conferimento dei dati</h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          I dati necessari all’iscrizione e alla gestione della richiesta sono{" "}
          <strong>obbligatori</strong>; in mancanza non è possibile erogare il
          servizio. Le finalità facoltative (es. marketing) richiedono{" "}
          <strong>consenso</strong> separato.
        </p>
      </div>

      {/* DESTINATARI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Destinatari</h2>
      <div className="rounded-2xl border border-gray-200 divide-y">
        <Row label="Personale autorizzato">
          Del Titolare, istruito e soggetto a riservatezza.
        </Row>
        <Row label="Fornitori/processor">
          Servizi strumentali (hosting, manutenzione IT, email,
          antifrode/AML-KYC, autenticazione), nominati responsabili del
          trattamento.
        </Row>
        <Row label="Soggetti terzi legittimati">
          Autorità/enti pubblici quando imposto da obblighi normativi o ordini
          vincolanti.
        </Row>
      </div>

      {/* TRASFERIMENTI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Trasferimenti extra-SEE
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Il trattamento avviene in via ordinaria nello Spazio Economico
          Europeo. Qualora siano necessari trasferimenti verso Paesi terzi,
          saranno adottate <strong>garanzie adeguate</strong> nel rispetto della
          normativa applicabile e l’utente sarà informato con indicazioni
          puntuali.
        </p>
      </div>

      {/* CONSERVAZIONE */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Tempi di conservazione
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5 space-y-3">
        <Conserve label="Account e log di sicurezza">
          Per il tempo necessario alla fornitura del servizio e alla tutela del
          Titolare; in caso di richiesta di cancellazione, nei limiti tecnici e
          legali.
        </Conserve>
        <Conserve label="Dati richieste di prestito">
          Per la durata dell’istruttoria e, in caso di esito positivo, per i
          periodi richiesti dalla normativa applicabile in materia
          amministrativa e fiscale.
        </Conserve>
        <Conserve label="Documentazione AML/KYC">
          Per i termini minimi di legge, ove applicabili.
        </Conserve>
        <Conserve label="Marketing">
          Fino a revoca del consenso o alla richiesta di opposizione.
        </Conserve>
      </div>

      {/* DECISIONI AUTOMATIZZATE */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Decisioni automatizzate e profilazione
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Non vengono adottate decisioni <em>unicamente</em> automatizzate che
          producano effetti giuridici sull’utente senza adeguate garanzie. La
          valutazione delle richieste può includere procedure automatizzate a
          supporto dell’analisi, con intervento umano. La profilazione a fini
          marketing è effettuata solo previo consenso.
        </p>
      </div>

      {/* DIRITTI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Diritti degli interessati
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          È possibile esercitare i diritti previsti dal GDPR (accesso,
          rettifica, cancellazione, limitazione, portabilità, opposizione, e
          revoca del consenso quando applicabile) contattando il Titolare ai
          recapiti indicati.
        </p>
        <p className="text-gray-800 mt-3">
          Diritto di reclamo all’Autorità Garante per la protezione dei dati
          personali:&nbsp;
          <a
            href="https://www.garanteprivacy.it/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            www.garanteprivacy.it
          </a>
          .
        </p>
      </div>

      {/* SICUREZZA */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Sicurezza dei dati</h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Il Titolare adotta misure tecniche e organizzative adeguate per
          proteggere i dati personali contro distruzione, perdita, modifica,
          divulgazione non autorizzata o accesso, tenendo conto dello stato
          dell’arte, dei costi di attuazione e della natura, oggetto, contesto e
          finalità del trattamento.
        </p>
      </div>

      {/* COOKIE E TECNOLOGIE SIMILI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Cookie e tecnologie simili
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Per informazioni su cookie tecnici e, ove presenti, cookie di
          profilazione e strumenti analoghi, consulta la{" "}
          <a href="/cookie-policy" className="underline">
            Cookie Policy
          </a>{" "}
          dedicata, che illustra le categorie utilizzate e le opzioni di
          gestione del consenso.
        </p>
      </div>

      {/* MINORI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Minori</h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Il servizio è rivolto a utenti di età pari o superiore a 18 anni. Il
          Titolare non raccoglie consapevolmente dati di minori; eventuali dati
          involontariamente raccolti saranno cancellati con tempestività.
        </p>
      </div>

      {/* MODIFICHE */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        Modifiche alla presente informativa
      </h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-gray-800">
          Il Titolare potrà aggiornare la presente informativa. Le versioni
          aggiornate saranno pubblicate su questa pagina e rese disponibili
          all’interno dell’applicazione.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          Ultimo aggiornamento: <em>[10/07/2025]</em>
        </p>
      </div>

      {/* CONTATTI */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Contatti</h2>
      <div className="rounded-2xl border border-gray-200 p-5">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium">
              <a href="mailto:privacy@myloanmate.local" className="underline">
                privacy@myloanmate.local
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Sede legale</dt>
            <dd className="font-medium">
              <em>[indirizzo completo]</em>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* -------------------- Subcomponents -------------------- */

function PurposeCard({
  title,
  basis,
  detail,
}: {
  title: string;
  basis: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-700 mt-1">{basis}</p>
      {detail ? <p className="text-sm text-gray-700 mt-1">{detail}</p> : null}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="sm:col-span-2 font-medium text-gray-900">{children}</div>
    </div>
  );
}

function Conserve({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="sm:col-span-2 text-gray-900">{children}</div>
    </div>
  );
}
