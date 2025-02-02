"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, DollarSign, CalendarIcon, TrendingUp, PlusCircle, Percent, Clock } from "lucide-react"
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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
  {
    id: "3",
    name: "Personal Loan",
    amount: 10000,
    interestRate: 6.0,
    term: 36,
    startDate: new Date("2023-05-01"),
    nextPaymentDue: new Date("2023-06-01"),
    outstandingBalance: 9800,
  },
]

const recommendedLoans = [
  {
    name: "Low-Interest Home Loan",
    interestRate: 2.9,
    term: 360,
    maxAmount: 500000,
    description: "Ideal for first-time homebuyers with excellent credit scores.",
  },
  {
    name: "Flexible Personal Loan",
    interestRate: 5.5,
    term: 60,
    maxAmount: 50000,
    description: "Great for debt consolidation or major purchases.",
  },
  {
    name: "Student Refinance Loan",
    interestRate: 3.5,
    term: 120,
    maxAmount: 100000,
    description: "Refinance your existing student loans at a lower rate.",
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

  const radialChartData = loans.map((loan, index) => ({
    name: loan.name,
    outstandingBalance: loan.outstandingBalance,
    fill: `hsl(${index * 60}, 100%, 50%)`,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOutstanding.toFixed(2)}</div>
            <p className="text-xs text-blue-100">Across all loans</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interest Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalInterestPaid.toFixed(2)}</div>
            <p className="text-xs text-green-100">Lifetime interest payments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CalendarIcon className="h-4 w-4 text-purple-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
            <p className="text-xs text-purple-100">Currently active loans</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(Math.min(...loans.map((loan) => loan.nextPaymentDue.getTime()))).toLocaleDateString()}
            </div>
            <p className="text-xs text-red-100">Upcoming payment due</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="add-loan">Add Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={20}
                    data={radialChartData}
                  >
                    <RadialBar minAngle={15} background clockWise dataKey="outstandingBalance" />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-2 rounded shadow">
                              <p className="font-semibold text-black">{data.name}</p>
                              <p className="text-black">₹{data.outstandingBalance.toFixed(2)}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
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
                        <Badge variant="secondary">₹{(loan.amount / loan.term).toFixed(2)}</Badge>
                      </div>
                    ))}
                    {getDueDates(selectedDate || new Date()).length === 0 && (
                      <p className="text-muted-foreground">No payments due on this date.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
        </TabsContent>
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>A list of your current active loans.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Outstanding Balance</TableHead>
                    <TableHead>Next Payment Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.name}</TableCell>
                      <TableCell>₹{loan.amount.toFixed(2)}</TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>₹{loan.outstandingBalance.toFixed(2)}</TableCell>
                      <TableCell>{loan.nextPaymentDue.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add-loan">
          <Card>
            <CardHeader>
              <CardTitle>Add New Loan</CardTitle>
              <CardDescription>Enter the details of your new loan below.</CardDescription>
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
                      value={newLoan.amount || ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 0 : Number(e.target.value)
                        setNewLoan({ ...newLoan, amount: value })
                      }}
                      onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={newLoan.interestRate || ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 0 : Number(e.target.value)
                        setNewLoan({ ...newLoan, interestRate: value })
                      }}
                      onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Loan Term (months)</Label>
                    <Input
                      id="term"
                      type="number"
                      value={newLoan.term || ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 0 : Number(e.target.value)
                        setNewLoan({ ...newLoan, term: value })
                      }}
                      onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
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
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Loan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Loan Recommendations</CardTitle>
          <CardDescription>Based on your profile, here are some recommended loans:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedLoans.map((loan, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{loan.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Interest Rate: {loan.interestRate}%</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Term: {loan.term} months</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Max Amount: ₹{loan.maxAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{loan.description}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

