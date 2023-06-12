import type { NextPage } from 'next'
import { BaseLayout } from '@ui';
import { LockClosedIcon, ServerIcon } from '@heroicons/react/outline';
import React from 'react';
import Quiz from "../pages/QuizPage"


const Learn: NextPage = () => {
    

return(
    

    <BaseLayout>
     <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Η Γνώση Είναι Δύναμη!</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Κυκλική Οικονομία και NFTs</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Στην εποχή μας η γνώση αποτελεί το σημαντικότερο απόκτημα. Αρκεί μόνο ένα πάτημα ενός κουμπιού και ό,τι θελήσουμε να μάθουμε 
                θα εμφανιστεί μπροστά μας. Το μόνο που έχουμε να κάνουμε είναι να την αξιοποιήσουμε σωστά. Η ορθή εκμετάλλευση της γνώσης μας
                προσφέρει ασφάλεια.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="/images/page_logo.png"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              Τα NFTs (Non-Fungible Tokens) είναι ψηφιακά αποκλειστικά αντικείμενα που βασίζονται στην
               τεχνολογία των blockchain. Αντίθετα με τα κρυπτονομίσματα που είναι αντικαταστάσιμα, τα NFTs είναι μοναδικά και αδύνατον
                να αντικατασταθούν. Χρησιμοποιούνται για την αντιπροσώπευση διάφορων ψηφιακών αγαθών, όπως έργα τέχνης, 
                συλλεκτικά αντικείμενα, εικόνες, βίντεο και άλλα.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  
                  <span>
                    <strong className="font-semibold text-gray-900">Καινοτομία.</strong> Τα NFTs είναι καινοτόμα γιατί επιτρέπουν την αντιπροσώπευση και την απόδειξη αυθεντικότητας ψηφιακών αντικειμένων με τη χρήση της τεχνολογίας blockchain. Αυτό ανοίγει νέες δυνατότητες στον τομέα της τέχνης, των συλλεκτικών και της ψηφιακής ιδιοκτησίας.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Ασφάλεια.</strong> Η ασφάλεια των NFTs εξασφαλίζεται από την τεχνολογία των blockchain που
                     χρησιμοποιείται για τη δημιουργία και την ανταλλαγή τους. Η αναγνωρισιμότητα και η αυθεντικότητα των NFTs παρέχονται 
                     από τις μοναδικές καταγραφές τους στο blockchain, εξαλείφοντας τον κίνδυνο απομίμησης και απάτης.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Αποθήκευση.</strong> Τα NFTs μπορούν να αποθηκευτούν σε ψηφιακά πορτοφόλια 
                    που υποστηρίζουν την αποθήκευση κρυπτονομισμάτων και άλλων ψηφιακών αστικών. Η αποθήκευση μπορεί να γίνει σε online πλατφόρμες, 
                    όπως ανταλλακτήρια και αγοραπωλησίες NFTs, ή σε ψηφιακά πορτοφόλια που είναι αυτόνομα και ασφαλή.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
              Η κυκλική οικονομία είναι ένα προηγμένο μοντέλο οικονομικής 
              λειτουργίας που βασίζεται στην αρχή της βιώσιμης ανακύκλωσης και αξιοποίησης των πόρων.
              Σε αντίθεση με το παραδοσιακό γραμμικό μοντέλο παραγωγή-κατανάλωση-απόρριψη, 
              η κυκλική οικονομία προωθεί την ανακύκλωση, την επαναχρησιμοποίηση και την ανανέωση των υλικών.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Ενημερώθηκες; Δοκίμασε τις γνώσεις σου.</h2>
              <p className="mt-6">
                Εάν θέλεις να δοκιμάσεις τις γνώσεις που απέκτησες δοκίμασε το κουίζ. Και αν δεν τα πας καλά μην αγχώνεσαι , έχεις όσες ευκαρίες θες έτσι και αλλιώς όπως συνηθίζουν να 
                λένε οι σοφοί                                           
                 : Επανάληψις, μήτηρ πάσης μαθήσεως!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      {/* Other content */}
      
      {/* Place the Quiz component at the end */}
      <Quiz/>
    </div>
  
    </BaseLayout>


    )
    
}


export default Learn;

