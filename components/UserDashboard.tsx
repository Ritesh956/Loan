"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, DollarSign, CalendarIcon, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Loan {
  id: string
  name: string
  amount: number
  interestRate: number
  term: number
  startDate: Date
  nextPaymentDue: Date
  outstandingBalance: number
}

const mockLoans: Loan[] = [
  {
    id: "1",
    name: "Home Loan",
    amount: 200000,
    interestRate: 3.5,
    term: 360,
    startDate: new Date("2023-01-01"),
    nextPaymentDue: new Date("2023-02-01"),
    outstandingBalance: 198000,
  },
  {
    id: "2",
    name: "Car Loan",
    amount: 30000,
    interestRate: 4.5,
    term: 60,
    startDate: new Date("2023-03-01"),
    nextPaymentDue: new Date("2023-04-01"),
    outstandingBalance: 29000,
  },
]

export function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [loans, setLoans] = useState<Loan[]>(mockLoans)
  const [newLoan, setNewLoan] = useState({
    name: "",
    amount: 0,
    interestRate: 0,
    term: 0,
    startDate: new Date(),
  })

  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstandingBalance, 0)
  const totalInterestPaid = loans.reduce((sum, loan) => {
    const monthlyRate = loan.interestRate / 12 / 100
    const monthlyPayment =
      (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.term)) / (Math.pow(1 + monthlyRate, loan.term) - 1)
    const totalPayments = monthlyPayment * loan.term
    return sum + (totalPayments - loan.amount)
  }, 0)

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault()
    const newLoanWithId: Loan = {
      ...newLoan,
      id: (loans.length + 1).toString(),
      nextPaymentDue: new Date(newLoan.startDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days after start date
      outstandingBalance: newLoan.amount,
    }
    setLoans([...loans, newLoanWithId])
    setNewLoan({
      name: "",
      amount: 0,
      interestRate: 0,
      term: 0,
      startDate: new Date(),
    })
  }

  const getDueDates = (date: Date): Loan[] => {
    return loans.filter(
      (loan) =>
        loan.nextPaymentDue.getDate() === date.getDate() &&
        loan.nextPaymentDue.getMonth() === date.getMonth() &&
        loan.nextPaymentDue.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interest Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInterestPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime interest payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
            <p className="text-xs text-muted-foreground">Currently active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(Math.min(...loans.map((loan) => loan.nextPaymentDue.getTime()))).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming payment due</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{loan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Next payment: {loan.nextPaymentDue.toLocaleDateString()}
                  </p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="font-medium cursor-help mt-2 sm:mt-0">${loan.outstandingBalance.toFixed(2)}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Outstanding balance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddLoan} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanName">Loan Name</Label>
                <Input
                  id="loanName"
                  value={newLoan.name}
                  onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({ ...newLoan, amount: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={newLoan.interestRate}
                  onChange={(e) => setNewLoan({ ...newLoan, interestRate: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Loan Term (months)</Label>
                <Input
                  id="term"
                  type="number"
                  value={newLoan.term}
                  onChange={(e) => setNewLoan({ ...newLoan, term: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newLoan.startDate.toISOString().split("T")[0]}
                  onChange={(e) => setNewLoan({ ...newLoan, startDate: new Date(e.target.value) })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add Loan
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={loans}
                dataKey="outstandingBalance"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {loans.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Repayment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">Payments due on {selectedDate?.toLocaleDateString()}</h3>
                {getDueDates(selectedDate || new Date()).map((loan) => (
                  <div key={loan.id} className="mb-2 flex justify-between items-center">
                    <span>{loan.name}</span>
                    <span className="font-medium">${(loan.amount / loan.term).toFixed(2)}</span>
                  </div>
                ))}
                {getDueDates(selectedDate || new Date()).length === 0 && (
                  <p className="text-muted-foreground">No payments due on this date.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {loans.map((loan) => {
                const totalPayments = loan.amount * (1 + loan.interestRate / 100)
                const progress = ((totalPayments - loan.outstandingBalance) / totalPayments) * 100
                return (
                  <div key={loan.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{loan.name}</span>
                      <span>{progress.toFixed(0)}% paid</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

