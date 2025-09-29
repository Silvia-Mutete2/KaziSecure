import { type NextRequest, NextResponse } from "next/server"

interface USSDSession {
  sessionId: string
  phoneNumber: string
  currentMenu: string
  userData?: any
  step: number
}

// In-memory session storage (in production, use Redis or database)
const sessions = new Map<string, USSDSession>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, serviceCode, phoneNumber, text } = body

    // Initialize or get existing session
    const session = sessions.get(sessionId) || {
      sessionId,
      phoneNumber,
      currentMenu: "main",
      step: 0,
    }

    const response = await handleUSSDRequest(session, text)

    // Update session
    sessions.set(sessionId, session)

    return NextResponse.json(response)
  } catch (error) {
    console.error("USSD Error:", error)
    return NextResponse.json({
      response: "END Service temporarily unavailable. Please try again later.",
      action: "end",
    })
  }
}

async function handleUSSDRequest(session: USSDSession, text: string) {
  const input = text.split("*").pop() || ""

  // Main menu
  if (!text || text === "") {
    return {
      response: `CON Welcome to KaziSecure
1. Check Balance
2. Add Income
3. View Expenses
4. AI Insights
5. Set Goals
6. Security
7. Help
0. Exit`,
      action: "continue",
    }
  }

  const menuPath = text.split("*")
  const currentChoice = menuPath[menuPath.length - 1]

  switch (menuPath[0]) {
    case "1": // Check Balance
      return await handleBalanceMenu(session, menuPath)

    case "2": // Add Income
      return await handleIncomeMenu(session, menuPath)

    case "3": // View Expenses
      return await handleExpensesMenu(session, menuPath)

    case "4": // AI Insights
      return await handleAIInsightsMenu(session, menuPath)

    case "5": // Set Goals
      return await handleGoalsMenu(session, menuPath)

    case "6": // Security
      return await handleSecurityMenu(session, menuPath)

    case "7": // Help
      return await handleHelpMenu(session, menuPath)

    case "0": // Exit
      return {
        response: "END Thank you for using KaziSecure. Stay financially empowered!",
        action: "end",
      }

    default:
      return {
        response: "END Invalid option. Please dial *384*7# to try again.",
        action: "end",
      }
  }
}

async function handleBalanceMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    // Mock user data - in production, fetch from database
    const userData = {
      balance: 45280,
      monthlyEarnings: 45280,
      savings: 8500,
      expenses: 36780,
    }

    return {
      response: `CON Your Financial Summary:
Current Balance: KSh ${userData.balance.toLocaleString()}
Monthly Earnings: KSh ${userData.monthlyEarnings.toLocaleString()}
Savings: KSh ${userData.savings.toLocaleString()}
Expenses: KSh ${userData.expenses.toLocaleString()}

1. Detailed Breakdown
2. Weekly Summary
3. Send via SMS
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // Detailed Breakdown
      return {
        response: `END Detailed Financial Breakdown:
Income Sources:
- Uber: KSh 28,500
- Delivery: KSh 16,780

Top Expenses:
- Fuel: KSh 15,000
- Food: KSh 12,000
- Maintenance: KSh 8,000

Net Profit: KSh 8,500`,
        action: "end",
      }

    case "2": // Weekly Summary
      return {
        response: `END Weekly Performance:
Week 1: KSh 12,000
Week 2: KSh 15,000
Week 3: KSh 18,280
Week 4: KSh 0 (Current)

Average: KSh 15,093/week
Trend: +15% growth`,
        action: "end",
      }

    case "3": // Send via SMS
      // In production, integrate with SMS service
      return {
        response: `END Financial summary sent to ${session.phoneNumber}. 
Check your messages in 1-2 minutes.

Standard SMS rates apply.`,
        action: "end",
      }

    case "0":
      return {
        response: `CON Welcome to KaziSecure
1. Check Balance
2. Add Income
3. View Expenses
4. AI Insights
5. Set Goals
6. Security
7. Help
0. Exit`,
        action: "continue",
      }

    default:
      return {
        response: "END Invalid option. Please try again.",
        action: "end",
      }
  }
}

async function handleIncomeMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON Add Income:
1. Uber/Bolt Ride
2. Delivery Service
3. Other Transport
4. Manual Entry
0. Back to Main Menu`,
      action: "continue",
    }
  }

  if (menuPath.length === 2) {
    const incomeTypes = {
      "1": "Uber/Bolt Ride",
      "2": "Delivery Service",
      "3": "Other Transport",
      "4": "Manual Entry",
    }

    const selectedType = incomeTypes[menuPath[1] as keyof typeof incomeTypes]

    if (selectedType) {
      session.userData = { incomeType: selectedType }
      return {
        response: `CON ${selectedType}
Enter amount (KSh):
Example: 1500`,
        action: "continue",
      }
    }
  }

  if (menuPath.length === 3) {
    const amount = Number.parseInt(menuPath[2])
    if (isNaN(amount) || amount <= 0) {
      return {
        response: "END Invalid amount. Please try again with a valid number.",
        action: "end",
      }
    }

    // In production, save to database
    return {
      response: `END Income Added Successfully!
Type: ${session.userData?.incomeType}
Amount: KSh ${amount.toLocaleString()}
Time: ${new Date().toLocaleString()}

New Balance: KSh ${(45280 + amount).toLocaleString()}`,
      action: "end",
    }
  }

  return {
    response: "END Invalid input. Please try again.",
    action: "end",
  }
}

async function handleExpensesMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON Your Expenses (This Month):
Fuel: KSh 15,000 (41%)
Food: KSh 12,000 (33%)
Maintenance: KSh 8,000 (22%)
Phone/Data: KSh 1,780 (4%)

Total: KSh 36,780

1. Add Expense
2. Category Breakdown
3. Weekly View
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // Add Expense
      if (menuPath.length === 2) {
        return {
          response: `CON Add Expense:
1. Fuel
2. Food
3. Maintenance
4. Phone/Data
5. Other
0. Back`,
          action: "continue",
        }
      }

      if (menuPath.length === 3) {
        const expenseTypes = {
          "1": "Fuel",
          "2": "Food",
          "3": "Maintenance",
          "4": "Phone/Data",
          "5": "Other",
        }

        const selectedType = expenseTypes[menuPath[2] as keyof typeof expenseTypes]
        if (selectedType) {
          return {
            response: `CON ${selectedType} Expense
Enter amount (KSh):`,
            action: "continue",
          }
        }
      }

      if (menuPath.length === 4) {
        const amount = Number.parseInt(menuPath[3])
        if (isNaN(amount) || amount <= 0) {
          return {
            response: "END Invalid amount. Please try again.",
            action: "end",
          }
        }

        return {
          response: `END Expense Added!
Amount: KSh ${amount.toLocaleString()}
Remaining Budget: KSh ${(60000 - 36780 - amount).toLocaleString()}`,
          action: "end",
        }
      }
      break

    case "2": // Category Breakdown
      return {
        response: `END Expense Categories:
1. Fuel: KSh 15,000
   - 45 transactions
   - Avg: KSh 333/fill

2. Food: KSh 12,000
   - Daily avg: KSh 400

3. Maintenance: KSh 8,000
   - Last service: 2 weeks ago

4. Phone/Data: KSh 1,780
   - Data: KSh 1,500
   - Airtime: KSh 280`,
        action: "end",
      }

    case "3": // Weekly View
      return {
        response: `END Weekly Expenses:
Week 1: KSh 9,200
Week 2: KSh 8,800
Week 3: KSh 10,500
Week 4: KSh 8,280

Average: KSh 9,195/week
Trend: Stable`,
        action: "end",
      }
  }

  return {
    response: "END Invalid option. Please try again.",
    action: "end",
  }
}

async function handleAIInsightsMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON AI Financial Insights:
1. Income Prediction
2. Optimization Tips
3. Risk Alerts
4. Goal Progress
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // Income Prediction
      return {
        response: `END AI Income Forecast:
Today: KSh 3,200 (85% confidence)
This Week: KSh 18,500 (78% confidence)
This Month: KSh 72,000 (72% confidence)

Peak Hours: 7-9 PM (+40% earnings)
Best Days: Fri-Sun
Weather Impact: Rain = +25%`,
        action: "end",
      }

    case "2": // Optimization Tips
      return {
        response: `END AI Optimization Tips:
1. Work 2 more hours during 7-9 PM
   Potential: +KSh 3,800/month

2. Optimize routes using AI
   Fuel savings: KSh 3,000/month

3. Balance services: 60% rides, 40% delivery
   Income boost: +KSh 2,100/month

Total potential: +KSh 8,900/month`,
        action: "end",
      }

    case "3": // Risk Alerts
      return {
        response: `END Risk Assessment:
HIGH RISK:
- Fuel price volatility (75% likely)
- Vehicle breakdown risk (25% likely)

MEDIUM RISK:
- Seasonal demand drop (60% likely)

RECOMMENDATIONS:
- Build emergency fund
- Schedule maintenance
- Diversify income sources`,
        action: "end",
      }

    case "4": // Goal Progress
      return {
        response: `END Goal Progress:
Monthly Target: KSh 60,000
Current: KSh 45,280 (75%)
Remaining: KSh 14,720

Emergency Fund: KSh 8,500/15,000 (57%)
On track to complete in 2.3 months

AI suggests: 3 more peak-hour sessions to reach monthly goal`,
        action: "end",
      }
  }

  return {
    response: "END Invalid option. Please try again.",
    action: "end",
  }
}

async function handleGoalsMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON Financial Goals:
1. View Current Goals
2. Set New Goal
3. Update Progress
4. Goal Insights
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // View Current Goals
      return {
        response: `END Current Goals:
1. Monthly Income: KSh 60,000
   Progress: 75% (KSh 45,280)
   
2. Emergency Fund: KSh 15,000
   Progress: 57% (KSh 8,500)
   
3. Vehicle Upgrade: KSh 200,000
   Progress: 15% (KSh 30,000)
   
4. Insurance Premium: KSh 25,000
   Progress: 80% (KSh 20,000)`,
        action: "end",
      }

    case "2": // Set New Goal
      if (menuPath.length === 2) {
        return {
          response: `CON Set New Goal:
1. Savings Goal
2. Income Target
3. Expense Limit
4. Investment Goal
0. Back`,
          action: "continue",
        }
      }

      if (menuPath.length === 3) {
        const goalTypes = {
          "1": "Savings Goal",
          "2": "Income Target",
          "3": "Expense Limit",
          "4": "Investment Goal",
        }

        const selectedGoal = goalTypes[menuPath[2] as keyof typeof goalTypes]
        if (selectedGoal) {
          return {
            response: `CON ${selectedGoal}
Enter target amount (KSh):`,
            action: "continue",
          }
        }
      }

      if (menuPath.length === 4) {
        const amount = Number.parseInt(menuPath[3])
        if (isNaN(amount) || amount <= 0) {
          return {
            response: "END Invalid amount. Please try again.",
            action: "end",
          }
        }

        return {
          response: `CON Goal Amount: KSh ${amount.toLocaleString()}
Enter target months:
Example: 6`,
          action: "continue",
        }
      }

      if (menuPath.length === 5) {
        const months = Number.parseInt(menuPath[4])
        const amount = Number.parseInt(menuPath[3])

        if (isNaN(months) || months <= 0) {
          return {
            response: "END Invalid timeframe. Please try again.",
            action: "end",
          }
        }

        const monthlyTarget = Math.ceil(amount / months)

        return {
          response: `END Goal Created Successfully!
Target: KSh ${amount.toLocaleString()}
Timeframe: ${months} months
Monthly target: KSh ${monthlyTarget.toLocaleString()}

AI will track your progress and send reminders.`,
          action: "end",
        }
      }
      break

    case "3": // Update Progress
      return {
        response: `END Progress Update:
Monthly Income Goal: +KSh 2,500 today
New progress: 79% (KSh 47,780/60,000)

Emergency Fund: +KSh 500 saved
New progress: 60% (KSh 9,000/15,000)

Keep up the great work! You're on track to achieve your goals.`,
        action: "end",
      }

    case "4": // Goal Insights
      return {
        response: `END Goal Insights:
ACHIEVABLE GOALS:
- Monthly Income (79% complete)
- Insurance Premium (80% complete)

NEEDS ATTENTION:
- Vehicle Upgrade (15% complete)
  Suggestion: Increase savings by KSh 5,000/month

AI recommends focusing on emergency fund completion first for financial security.`,
        action: "end",
      }
  }

  return {
    response: "END Invalid option. Please try again.",
    action: "end",
  }
}

async function handleSecurityMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON Security Center:
1. Account Status
2. Recent Activity
3. Change PIN
4. Block Account
5. Security Tips
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // Account Status
      return {
        response: `END Account Security Status:
✓ Phone Verified
✓ 2FA Enabled
✓ Biometric Active
✓ Encryption: 256-bit

Last Login: Today 2:30 PM
Location: Nairobi, Kenya
Device: Android

Status: SECURE`,
        action: "end",
      }

    case "2": // Recent Activity
      return {
        response: `END Recent Security Activity:
1. Login - Today 2:30 PM ✓
2. Income added - Today 12:15 PM ✓
3. Goal updated - Yesterday 6:45 PM ✓
4. Failed login - 1 week ago ✗
   (Blocked automatically)

No suspicious activity detected.`,
        action: "end",
      }

    case "3": // Change PIN
      if (menuPath.length === 2) {
        return {
          response: `CON Change USSD PIN:
Enter current 4-digit PIN:`,
          action: "continue",
        }
      }

      if (menuPath.length === 3) {
        const currentPin = menuPath[2]
        if (currentPin.length !== 4 || isNaN(Number.parseInt(currentPin))) {
          return {
            response: "END Invalid PIN format. Must be 4 digits.",
            action: "end",
          }
        }

        return {
          response: `CON Enter new 4-digit PIN:`,
          action: "continue",
        }
      }

      if (menuPath.length === 4) {
        const newPin = menuPath[3]
        if (newPin.length !== 4 || isNaN(Number.parseInt(newPin))) {
          return {
            response: "END Invalid PIN format. Must be 4 digits.",
            action: "end",
          }
        }

        return {
          response: `CON Confirm new PIN:`,
          action: "continue",
        }
      }

      if (menuPath.length === 5) {
        const newPin = menuPath[3]
        const confirmPin = menuPath[4]

        if (newPin !== confirmPin) {
          return {
            response: "END PINs don't match. Please try again.",
            action: "end",
          }
        }

        return {
          response: `END PIN Changed Successfully!
Your USSD PIN has been updated.
Keep it secure and don't share with anyone.

Change effective immediately.`,
          action: "end",
        }
      }
      break

    case "4": // Block Account
      if (menuPath.length === 2) {
        return {
          response: `CON EMERGENCY: Block Account
This will immediately block all access to your account.

1. Confirm Block
2. Cancel
0. Back`,
          action: "continue",
        }
      }

      if (menuPath[2] === "1") {
        return {
          response: `END ACCOUNT BLOCKED!
Your KaziSecure account has been blocked for security.

To unblock:
- Visit nearest agent
- Call support: 0800-KAZISEC
- Provide ID verification

Block time: ${new Date().toLocaleString()}`,
          action: "end",
        }
      }
      break

    case "5": // Security Tips
      return {
        response: `END Security Tips:
1. Never share your PIN or password
2. Log out from shared devices
3. Check account regularly
4. Report suspicious activity immediately
5. Keep phone number updated
6. Use strong passwords
7. Enable all security features

Support: 0800-KAZISEC`,
        action: "end",
      }
  }

  return {
    response: "END Invalid option. Please try again.",
    action: "end",
  }
}

async function handleHelpMenu(session: USSDSession, menuPath: string[]) {
  if (menuPath.length === 1) {
    return {
      response: `CON KaziSecure Help:
1. How to Use
2. Features Guide
3. Troubleshooting
4. Contact Support
5. Pricing Info
6. Terms & Privacy
0. Back to Main Menu`,
      action: "continue",
    }
  }

  switch (menuPath[1]) {
    case "1": // How to Use
      return {
        response: `END How to Use KaziSecure:
1. Dial *384*7# anytime
2. Choose from menu options
3. Follow prompts to:
   - Check balance
   - Add income/expenses
   - Get AI insights
   - Set financial goals

Works on any phone, no internet needed!
Available 24/7 in English & Swahili`,
        action: "end",
      }

    case "2": // Features Guide
      return {
        response: `END Features Guide:
✓ Real-time balance checking
✓ Income & expense tracking
✓ AI-powered predictions
✓ Goal setting & monitoring
✓ Security features
✓ SMS notifications
✓ Multi-language support
✓ Offline access via USSD
✓ Integration with M-Pesa`,
        action: "end",
      }

    case "3": // Troubleshooting
      return {
        response: `END Troubleshooting:
PROBLEM: Menu not loading
SOLUTION: Check network, try again

PROBLEM: Wrong balance shown
SOLUTION: Wait 5 minutes, refresh

PROBLEM: Can't add income
SOLUTION: Check amount format

PROBLEM: Forgot PIN
SOLUTION: Call 0800-KAZISEC

Still need help? Contact support.`,
        action: "end",
      }

    case "4": // Contact Support
      return {
        response: `END Contact Support:
📞 Call: 0800-KAZISEC (Free)
📱 SMS: Text HELP to 40404
🌐 Web: kazisecure.co.ke/support
📧 Email: help@kazisecure.co.ke

Office Hours: 6 AM - 10 PM
Emergency: 24/7 available

Languages: English, Swahili`,
        action: "end",
      }

    case "5": // Pricing Info
      return {
        response: `END Pricing Information:
USSD Access: FREE
SMS Notifications: KSh 1 each
Premium AI Insights: KSh 50/month
Data charges: As per your plan

No hidden fees!
No minimum balance required.
Cancel anytime.`,
        action: "end",
      }

    case "6": // Terms & Privacy
      return {
        response: `END Terms & Privacy:
Your data is encrypted and secure.
We never share personal information.
USSD sessions are not stored.
You control your data.

Full terms: kazisecure.co.ke/terms
Privacy policy: kazisecure.co.ke/privacy

Questions? Contact support.`,
        action: "end",
      }
  }

  return {
    response: "END Invalid option. Please try again.",
    action: "end",
  }
}
