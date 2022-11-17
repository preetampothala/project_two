import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZubSpvGA8p1M9Ybj8ye3TrKed8N3InpI",
  authDomain: "buffbank-effaf.firebaseapp.com",
  databaseURL: "https://buffbank-effaf-default-rtdb.firebaseio.com",
  projectId: "buffbank-effaf",
  storageBucket: "buffbank-effaf.appspot.com",
  messagingSenderId: "60010002987",
  appId: "1:60010002987:web:56f5c6f8ce51ccf368c86e",
  measurementId: "G-PHSC66565D",
};

type transaction = {
  amount: number;
  date: string;
};

type account = {
  firebaseId?: number;
  fullName: string;
  acctype: string;
  transactions: transaction[];
  interestRate: number;
}[];

type storage = {
  acctype: string;
  fullName: string;
  transactions: number[];
  interestRate: number;
};

const INITIAL_ACCOUNTS: account = [
  {
    fullName: "John Doe",
    acctype: "savings",
    interestRate: 1.2,
    transactions: [
      {
        amount: 200,
        date: "2021-11-18T21:31:17.178Z",
      },
      {
        amount: 455.23,
        date: "2021-12-23T07:42:02.383Z",
      },
      {
        amount: -306.5,
        date: "2022-01-28T09:15:04.904Z",
      },
      {
        amount: -642.21,
        date: "2022-04-01T10:17:24.185Z",
      },
      {
        amount: -133.9,
        date: "2022-05-08T14:11:59.604Z",
      },
      {
        amount: 79.97,
        date: "2022-07-26T17:01:17.194Z",
      },
      {
        amount: 1300,
        date: "2022-07-28T23:36:17.929Z",
      },
      {
        amount: 2000,
        date: "2022-08-01T10:51:36.790Z",
      },
    ],
  },
  {
    fullName: "Rickey Thomas Cooper",
    acctype: "savings",
    interestRate: 1.5,
    transactions: [
      {
        amount: 5000,
        date: "2021-11-18T21:31:17.178Z",
      },
      {
        amount: 3400,
        date: "2021-12-23T07:42:02.383Z",
      },
      {
        amount: -150,
        date: "2022-01-28T09:15:04.904Z",
      },
      {
        amount: -790,
        date: "2022-04-01T10:17:24.185Z",
      },
      {
        amount: -3210,
        date: "2022-05-08T14:11:59.604Z",
      },
      {
        amount: -1000,
        date: "2022-07-26T17:01:17.194Z",
      },
      {
        amount: 8500,
        date: "2022-07-28T23:36:17.929Z",
      },
      {
        amount: -30,
        date: "2022-08-01T10:51:36.790Z",
      },
      {
        amount: 50,
        date: "2022-08-01T10:51:36.790Z",
      },
    ],
  },
  {
    fullName: "Edris Beckford",
    acctype: "current",
    interestRate: 1.4,
    transactions: [
      {
        amount: 200,
        date: "2021-11-18T21:31:17.178Z",
      },
      {
        amount: -200,
        date: "2021-12-23T07:42:02.383Z",
      },
      {
        amount: 340,
        date: "2022-01-28T09:15:04.904Z",
      },
      {
        amount: -300,
        date: "2022-04-01T10:17:24.185Z",
      },
      {
        amount: -20,
        date: "2022-05-08T14:11:59.604Z",
      },
      {
        amount: 50,
        date: "2022-07-26T17:01:17.194Z",
      },
      {
        amount: 400,
        date: "2022-07-28T23:36:17.929Z",
      },
      {
        amount: -460,
        date: "2022-08-01T10:51:36.790Z",
      },
      {
        amount: 2000,
        date: "2022-08-01T10:51:36.790Z",
      },
    ],
  },
  {
    fullName: "Carol Muriel Mattes",
    acctype: "current",
    interestRate: 1.6,
    transactions: [
      {
        amount: 430,
        date: "2021-11-18T21:31:17.178Z",
      },
      {
        amount: 1000,
        date: "2021-12-23T07:42:02.383Z",
      },
      {
        amount: 700,
        date: "2022-01-28T09:15:04.904Z",
      },
      {
        amount: 50,
        date: "2022-04-01T10:17:24.185Z",
      },
      {
        amount: 90,
        date: "2022-05-08T14:11:59.604Z",
      },
      {
        amount: -2000,
        date: "2022-07-26T17:01:17.194Z",
      },
      {
        amount: 2154,
        date: "2022-07-28T23:36:17.929Z",
      },
    ],
  },
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
let dataref = ref(db);

function writeAccounts(accounts: account = []) {
  const db = getDatabase(app);
  const accountsRef = ref(db, "accounts");
  return set(accountsRef, accounts);
}

function readAccounts(accounts: account = []) {
  const db = getDatabase(app);
  const accountsRef = ref(db, "accounts");
  return get(accountsRef);
}

function removeAccount(accountId: number) {
  const db = getDatabase(app);
  const accountsRef = ref(db, "accounts/" + accountId.toString());
  return remove(accountsRef);
}

function addAccount(accounts: any) {
  const db = getDatabase(app);
  const accountsRef = ref(db, "accounts");
  return set(accountsRef, accounts);
}

function updateAccount(accountId: number, account: any) {
  const db = getDatabase(app);
  const accountsRef = ref(db, "accounts/" + accountId.toString());
  return set(accountsRef, account);
}

let sort = true;
let timer: NodeJS.Timeout;

export interface Acc {
  fullName?: string;
  acctype?: string;
  interestRate?: number;
  username?: string;
  pin?: number;
}

export class Account implements Acc {
  fullName?: string;
  firebaseId?: number;
  acctype?: string;
  transactions?: transaction[];
  interestRate?: number;
  balance?: number;
  username?: string;
  pin: number = 1111;
  minimumBalance?: number;
  constructor(
    firebaseId?: number,
    fullName?: string,
    transactions?: transaction[],
    interestRate?: number
  ) {
    if (fullName && transactions && interestRate) {
      this.firebaseId = firebaseId;
      this.fullName = fullName;
      this.transactions = transactions;
      this.interestRate = interestRate;
      this.username = this.generateUsername();
    }
  }
  private generateUsername(): string {
    return this.fullName!.toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  }

  getBalance(): number {
    if (this.transactions) {
      this.balance = this.transactions.reduce((a, b) => a + b.amount, 0);
    }
    return this.balance!;
  }

  getInterest(): string {
    let interest: string;
    if (this.transactions) {
      interest = this.transactions
        .filter((transaction) => transaction.amount > 0)
        .map((transaction) => (transaction.amount * this.interestRate!) / 100)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);
    }
    return interest!;
  }
  getInTrans(): string {
    let inTrans: string;
    if (this.transactions) {
      inTrans = this.transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, cur) => acc + cur.amount, 0)
        .toFixed(2);
    }
    return inTrans!;
  }
  getOutTrans() {
    let outTrans: number;
    if (this.transactions) {
      outTrans = Number(
        this.transactions
          .filter((transaction) => transaction.amount < 0)
          .reduce((acc, cur) => acc + cur.amount, 0)
          .toFixed(2)
      );
    }
    return outTrans!;
  }
  transfer(amount: number, receiverAccount: Account) {
    let text = ``;
    if (
      amount > 0 &&
      receiverAccount &&
      this.balance! >= amount &&
      receiverAccount?.username !== this.username &&
      this.balance! >= this.minimumBalance! &&
      this.balance! - amount >= this.minimumBalance!
    ) {
      receiverAccount!.transactions!.push({
        amount: Number(amount),
        date: new Date().toISOString(),
      });
      updateAccount(receiverAccount.firebaseId!, {
        transactions: receiverAccount.transactions,
        fullName: receiverAccount.fullName,
        acctype: receiverAccount.acctype,
        interestRate: receiverAccount.interestRate,
      });

      this.transactions?.push({
        amount: -Number(amount),
        date: new Date().toISOString(),
      });
      updateAccount(this.firebaseId!, {
        transactions: this.transactions,
        fullName: this.fullName,
        acctype: this.acctype,
        interestRate: this.interestRate,
      });
      return (text = `success`);
    } else {
      if (!(amount > 0)) text = `Please enter an amount greater than 0`;
      else if (!receiverAccount) text = `Please enter a valid To account name`;
      else if (!(this.balance! >= amount))
        text = `Please enter an amount less than your current balance`;
      else if (!(receiverAccount?.username !== this.username))
        text = `Please enter a different To account name that your current account`;
      else if (!(this.balance! - amount >= this.minimumBalance!))
        text = `You must maintian atleast $${this.minimumBalance} in your account`;
      return text;
    }
  }
  loan(amount: number) {
    let result = ``;
    if (
      amount > 0 &&
      this.transactions!.some(
        (transaction) => transaction.amount >= amount * 0.5
      )
    ) {
      this.transactions?.push({
        amount: Number(amount),
        date: new Date().toISOString(),
      });
      updateAccount(this.firebaseId!, {
        transactions: this.transactions,
        fullName: this.fullName,
        acctype: this.acctype,
        interestRate: this.interestRate,
      });
      return (result = `success`);
    } else {
      if (!(amount > 0)) result = `Please enter an amount greater than 0`;
      else if (
        !this.transactions!.some(
          (transaction) => transaction.amount >= amount * 0.5
        )
      )
        result = `Your loan request has been rejected because it doesn't meet the criteria`;
    }
    return result;
  }
}

class SavingsAccount extends Account {
  minimumBalance: number;
  acctype = "savings";
  constructor(
    firebaseId?: number,
    fullName?: string,
    transactions?: transaction[],
    interestRate?: number
  ) {
    super(firebaseId, fullName, transactions, interestRate);
    this.minimumBalance = 50;
  }
}
class CurrentAccount extends Account {
  minimumBalance: number;
  acctype = "current";
  constructor(
    firebaseId?: number,
    fullName?: string,
    transactions?: transaction[],
    interestRate?: number
  ) {
    super(firebaseId, fullName, transactions, interestRate);
    this.minimumBalance = 2000;
  }
}

const appElem = document.querySelector(".app") as HTMLElement;
const createELem = document.querySelector(".create-account") as HTMLElement;
const welcomeTextElem = document.querySelector(
  ".welcome"
) as HTMLTextAreaElement;
const loginUserElem = document.querySelector(
  ".login-input-user"
) as HTMLInputElement;
const loginPinElem = document.querySelector(
  ".login-input-pin"
) as HTMLInputElement;
const loginBtnElem = document.querySelector(".login-btn") as HTMLButtonElement;

const balanceElem = document.querySelector(
  ".balance-value"
) as HTMLTextAreaElement;

const transferAmtElem = document.querySelector(
  "#transferamount"
) as HTMLInputElement;
const transferToElem = document.querySelector(
  "#transferto"
) as HTMLSelectElement;
const transferBtnElem = document.querySelector(
  ".transfer-btn"
) as HTMLButtonElement;

const loanAmtElem = document.querySelector("#loanamount") as HTMLButtonElement;
const loanBtnElem = document.querySelector(".loan-btn") as HTMLButtonElement;
const sortBtnElem = document.querySelector(".btn-sort") as HTMLButtonElement;
const logoutBtnElem = document.querySelector(
  ".logout-btn"
) as HTMLButtonElement;
const nameInputElem = document.querySelector("#full-name") as HTMLInputElement;
const createBtnElem = document.querySelector(
  ".create-btn"
) as HTMLButtonElement;
const accntTypeElem = document.querySelector("#accnttype") as HTMLInputElement;

const summaryValueInElem = document.querySelector(
  ".summaryvaluein"
) as HTMLTextAreaElement;
const summaryValueOutElem = document.querySelector(
  ".summaryvalueout"
) as HTMLTextAreaElement;
const summaryValueInterestElem = document.querySelector(
  ".summaryvalueinterest"
) as HTMLTextAreaElement;
const transactionsElem = document.querySelector(".transactions") as HTMLElement;
const appCloseElem = document.querySelector(".appclose") as HTMLButtonElement;
const appErrorMsgElem = document.querySelector(
  ".apperrormessage"
) as HTMLElement;
const loginCloseElem = document.querySelector(
  ".loginclose"
) as HTMLButtonElement;
const loginErrorMsgElem = document.querySelector(
  ".loginerrormessage"
) as HTMLElement;
const labelTimer = document.querySelector(".timer") as HTMLElement;
//Delete account
const delAccntUsernameElem = document.querySelector(
  "#delusername"
) as HTMLInputElement;
const delAccntPinElem = document.querySelector("#delpin") as HTMLInputElement;
const delAccntBtnElem = document.querySelector(
  ".delete-btn"
) as HTMLButtonElement;

class App {
  private accounts: Account[] = [];
  private currentAccount?: Account;
  constructor() {
    loginBtnElem.addEventListener("click", this.login.bind(this));
    transferBtnElem.addEventListener("click", this.transfer.bind(this));
    loanBtnElem.addEventListener("click", this.loan.bind(this));
    appCloseElem.addEventListener("click", this.closeErrormsg);
    loginCloseElem.addEventListener("click", this.closeErrormsg);
    sortBtnElem.addEventListener("click", this.sortTransactions.bind(this));
    logoutBtnElem.addEventListener("click", this.logout.bind(this));
    createBtnElem.addEventListener("click", this.addAccount.bind(this));
    delAccntBtnElem.addEventListener("click", this.deleteAccount.bind(this));
    this.fetchInitialData();
  }

  private login(e: Event) {
    e.preventDefault();
    let text = "";
    const username = loginUserElem.value;
    const pin = Number(loginPinElem.value);
    let currentAccount = this.accounts.find(
      (acc) => acc.username === username && acc.pin === pin
    );
    if (currentAccount) {
      if (currentAccount?.pin === pin) {
        this.updateUI(currentAccount);
        this.currentAccount = currentAccount;
        appElem.style.display = "block";
        loginBtnElem.style.display = "none";
        logoutBtnElem.style.display = "block";
        createELem.style.display = "none";
        welcomeTextElem.textContent = `Welcome back, ${currentAccount!
          .fullName!}`;
        this.closeErrormsg();
      }
    } else {
      if (!currentAccount) {
        text = `No such account exists`;
      } else if (!(currentAccount?.[pin] === pin))
        text = `Please enter a correct pin`;
      this.displayErrorMsg(loginErrorMsgElem, text, "Login");
    }
    loginUserElem.value = loginPinElem.value = "";
    loginPinElem.blur();

    if (timer) {
      clearInterval(timer);
    }
    timer = this.startLogOutTimer();
  }
  private logout() {
    appElem.style.display = "none";
    createELem.style.display = "flex";
    loginBtnElem.style.display = "block";
    logoutBtnElem.style.display = "none";
    welcomeTextElem.textContent = `Log in to get started`;
  }
  private transfer(e: Event) {
    e.preventDefault();
    const amount = Number(transferAmtElem.value);
    const receiver = transferToElem.value;
    const receiverAccount = this.accounts.find(
      (acc) => acc.username === receiver
    );
    let transferReturn = this.currentAccount!.transfer(
      amount,
      receiverAccount!
    );
    if (transferReturn === "success") {
      this.updateUI(this.currentAccount!);
      this.closeErrormsg();
    } else {
      this.displayErrorMsg(appErrorMsgElem, transferReturn, "Transfer");
    }
    transferAmtElem.value = transferToElem.value = "";
  }

  private updateUI(acc: Account): void {
    this.displayTransactions(acc);
    this.displayBalance(acc);
    this.displaysummary(acc);
    this.payeeDropdownDisplay(acc);
  }
  private displayTransactions(acc: Account, sort = false) {
    transactionsElem.innerHTML = "";
    let transactions = sort
      ? acc.transactions!.slice().sort((a, b) => a.amount - b.amount)
      : acc.transactions;

    transactions!.forEach((transaction, i) => {
      const date = new Date(transaction.date);
      const displayDate = this.formatTransactionDate(date, "en-US");
      const type = transaction.amount > 0 ? "Deposit" : "Withdrawl";
      const html = `<div class="transactions-row ${type}">
          <div class="trcount">
            ${i + 1}
          </div>
          <div class="transaction-date">${displayDate}</div>
          <div class="transactions-type transactions-type-${type}">${type}</div>
          <div class="transactions-value">${Math.abs(transaction.amount)}$</div>
        </div>`;
      transactionsElem.insertAdjacentHTML("afterbegin", html);
    });
    clearInterval(timer);
    timer = this.startLogOutTimer();
  }
  private loan(e: Event) {
    e.preventDefault();
    const amount = Number(loanAmtElem.value);
    let loanreturn = this.currentAccount!.loan(amount);
    if (loanreturn === `success`) {
      this.updateUI(this.currentAccount!);
    } else {
      this.displayErrorMsg(appErrorMsgElem, loanreturn, "Loan");
    }
    clearInterval(timer);
    timer = this.startLogOutTimer();
    loanAmtElem.value = "";
    loanAmtElem.blur();
  }

  private addAccount(e: Event): void {
    e.preventDefault();
    const fullName = nameInputElem.value;
    const acntType = accntTypeElem.value;
    if (!this.accounts.find((acc) => acc.fullName === fullName)) {
      if (fullName && acntType) {
        const new_account = {
          fullName: fullName,
          acctype: acntType,
          transactions:
            acntType === "savings"
              ? [{ amount: 50, date: new Date().toISOString() }]
              : [{ amount: 2000, date: new Date().toISOString() }],
          interestRate: acntType === "savings" ? 1.2 : 1.6,
        };
        const accounts = [];
        for (let account of this.accounts) {
          accounts.push({
            fullName: account.fullName,
            acctype: account.acctype,
            transactions: account.transactions,
            interestRate: account.interestRate,
          });
        }
        accounts.push(new_account);
        addAccount(accounts).then(() => {
          this.displaySuccessMsg(
            loginErrorMsgElem,
            `Hi ${fullName.toUpperCase()} Account created successfully`
          );
          readAccounts().then((snapshot) => {
            this.createTransactions(snapshot.val());
          });
        });
      }
    } else {
      this.displayErrorMsg(
        loginErrorMsgElem,
        `Account already exists with this name ${fullName.toUpperCase()}`
      );
    }
    nameInputElem.value = "";
    nameInputElem.blur();
    accntTypeElem.value = "";
  }
  private displayBalance(acc: Account): void {
    let balance = acc.getBalance();
    balanceElem.textContent = `${Math.abs(balance)!.toFixed(2)}$`;
    if (balance < 0) balanceElem.style.color = "red";
    else balanceElem.style.color = "green";
  }
  private displaysummary(acc: Account): void {
    summaryValueInElem.textContent = `${acc.getInTrans()}$`;
    summaryValueOutElem.textContent = `${Math.abs(acc.getOutTrans())}$`;
    summaryValueInterestElem.textContent = `${acc.getInterest()}$`;
  }

  private closeErrormsg(): void {
    appErrorMsgElem.style.display = "none";
    loginErrorMsgElem.style.display = "none";
  }

  private displayErrorMsg(elem: HTMLElement, msg: string, type = ``): void {
    elem.style.display = "block";
    elem.style.animation = "slideIn 0.5s ease-in-out";
    elem.style.backgroundColor = "#ffdada";
    elem.style.color = "red";
    if (elem.querySelector("p") != null) {
      elem.querySelector("p")!.textContent = "";
      elem.querySelector("p")!.textContent = `${type} Error. ${msg}`;
    }
    elem.style.display = "flex";
  }
  private displaySuccessMsg(elem: HTMLElement, msg: string, type = ``): void {
    elem.style.display = "block";
    elem.style.backgroundColor = "#e3ffd2";
    elem.style.animation = "slideIn 0.5s ease-in-out";
    elem.style.color = "green";
    if (elem.querySelector("p") != null) {
      elem.querySelector("p")!.textContent = "";
      elem.querySelector("p")!.textContent = `${type} Success. ${msg}`;
    }
    elem.style.display = "flex";
  }

  private sortTransactions(e: Event): void {
    e.preventDefault();
    sort = !sort;
    this.displayTransactions(this.currentAccount!, sort);
  }
  payeeDropdownDisplay(current: Account) {
    transferToElem.innerHTML = "";
    let accountname = `<option value="" disabled selected>Select Payee</option>`;

    this.accounts.forEach((acc) => {
      if (acc.username !== current.username) {
        accountname += `<option value="${acc.username}">${acc.username}</option>`;
      }
    });
    transferToElem.insertAdjacentHTML("beforeend", accountname);
    // transferToElem.innerHTML = text;
  }

  private createTransactions(data: any[]) {
    this.accounts = [];
    for (let accountId in data) {
      let account = data[accountId];
      if (account.acctype === "savings") {
        this.accounts.push(
          new SavingsAccount(
            Number(accountId),
            account.fullName,
            account.transactions,
            account.interestRate
          )
        );
      } else {
        this.accounts.push(
          new CurrentAccount(
            Number(accountId),
            account.fullName,
            account.transactions,
            account.interestRate
          )
        );
      }
    }
  }

  private fetchInitialData() {
    readAccounts()
      .then((snapshot) => {
        const data = snapshot.val();
        if (data && data.length > 0) {
          this.createTransactions(data);
        } else {
          writeAccounts(INITIAL_ACCOUNTS).then(() => {
            readAccounts().then((snapshot) => {
              this.createTransactions(snapshot.val());
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching accounts");
      });
  }

  private deleteAccount(e: Event): void {
    e.preventDefault();

    if (
      delAccntUsernameElem.value === this.currentAccount?.username &&
      +delAccntPinElem.value === this.currentAccount?.pin
    ) {
      const index = this.accounts.findIndex(
        (acc) => acc.username === this.currentAccount?.username
      );
      if (index !== -1) {
        let accountId = this.accounts[index].firebaseId;
        removeAccount(accountId!)
          .then(() => {
            this.accounts.splice(index, 1);
            this.displaySuccessMsg(
              loginErrorMsgElem,
              `Hi ${this.currentAccount!.fullName!.toUpperCase()} Account deleted successfully`
            );
            this.logout();
          })
          .catch((err) => {
            console.log(err);
            alert("Error deleting account");
          });
      } else {
        this.displayErrorMsg(
          appErrorMsgElem,
          `Account doesn't exists with this username ${delAccntUsernameElem.value}`
        );
      }
    }
    delAccntUsernameElem.value = "";
    delAccntUsernameElem.blur();
    delAccntPinElem.value = "";
    delAccntPinElem.blur();
  }
  private formatTransactionDate = function (date: Date, locale: string) {
    const calcDaysPassed = (date1: Date, date2: Date) =>
      Math.round(Math.abs(+date2 - +date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    return new Intl.DateTimeFormat(locale).format(date);
  };

  private startLogOutTimer() {
    let time = 45;
    const tick = () => {
      const min = String(Math.trunc(time / 60)).padStart(2, "0");
      const sec = String(time % 60).padStart(2, "0");
      labelTimer.textContent = `${min}:${sec}`;
      if (time === 0) {
        clearInterval(timer);
        this.logout();
      }
      // Decrease 1s
      time--;
    };
    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
  }
}
new App();

// const data = JSON.parse(localStorage.getItem("accounts") ?? "[]");
// if (data && data.length > 0) {
//   data.find((acc: storage) => {
//     if (acc.acctype === "savings") {
//       this.accounts.push(
//         new SavingsAccount(
//           acc.fullName,
//           acc.transactions,
//           acc.interestRate,
//           acc.transDates
//         )
//       );
//     } else {
//       this.accounts.push(
//         new CurrentAccount(
//           acc.fullName,
//           acc.transactions,
//           acc.interestRate,
//           acc.transDates
//         )
//       );
//     }
//   });
// } else {
//   INITIAL_ACCOUNTS.forEach((acc) => {
//     if (acc.acctype === "savings") {
//       this.accounts.push(
//         new SavingsAccount(
//           acc.fullName,
//           acc.transactions,
//           acc.interestRate,
//           acc.transDates
//         )
//       );
//     } else {
//       this.accounts.push(
//         new CurrentAccount(
//           acc.fullName,
//           acc.transactions,
//           acc.interestRate,
//           acc.transDates
//         )
//       );
//     }
//   });
// }
