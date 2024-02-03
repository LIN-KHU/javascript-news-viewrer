class BankAccount {
  constructor() {
    // 밑줄로 시작하는 네이밍 컨벤션을 통해 private 속성임을 나타냄
    this._balance = 0;
  }

  // setter 메서드를 통해 _balance 속성에 접근
  set balance(newBalance) {
    if (newBalance >= 0) {
      this._balance = newBalance;
    } else {
      console.log("잘못된 금액입니다.");
    }
  }

  // getter 메서드를 통해 _balance 속성을 읽음
  get balance() {
    return this._balance;
  }
}

const account = new BankAccount();

// setter를 통한 값 변경
account.balance = 1000;

// getter를 통한 값 읽기
console.log(account.balance); // 1000

// 잘못된 값으로 setter 호출
account.balance = -500; // "잘못된 금액입니다." 출력
console.log(account.balance); // 1000 (이전 값 유지)
