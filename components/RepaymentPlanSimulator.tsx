"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { calculateEMI, calculateTotalRepayment } from "@/utils/loanCalculations"
import { ArrowRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface SimulationResult {
  currentEMI: number
  newEMI: number
  currentTotalInterest: number
  newTotalInterest: number
  currentSchedule: { month: number; balance: number }[]
  newSchedule: { month: number; balance: number }[]
}

export function RepaymentPlanSimulator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [currentTenure, setCurrentTenure] = useState(60)
  const [newTenure, setNewTenure] = useState(60)
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)

  const simulateRepayment = () => {
    const currentEMI = calculateEMI(loanAmount, interestRate, currentTenure)
    const newEMI = calculateEMI(loanAmount, interestRate, newTenure)
    const currentTotalRepayment = calculateTotalRepayment(currentEMI, currentTenure)
    const newTotalRepayment = calculateTotalRepayment(newEMI, newTenure)

    const currentSchedule = generateRepaymentSchedule(loanAmount, interestRate, currentTenure)
    const newSchedule = generateRepaymentSchedule(loanAmount, interestRate, newTenure)

    setSimulationResult({
      currentEMI,
      newEMI,
      currentTotalInterest: currentTotalRepayment - loanAmount,
      newTotalInterest: newTotalRepayment - loanAmount,
      currentSchedule,
      newSchedule,
    })
  }

  const generateRepaymentSchedule = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100
    const emi = calculateEMI(principal, rate, tenure)
    let balance = principal
    const schedule = []

    for (let month = 0; month <= tenure; month += 1) {
      schedule.push({ month, balance: Math.max(0, balance) })
      const interest = balance * monthlyRate
      const principal = emi - interest
      balance -= principal
    }

    return schedule
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Repayment Plan Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentTenure">Current Tenure (months)</Label>
            <Input
              id="currentTenure"
              type="number"
              value={currentTenure}
              onChange={(e) => setCurrentTenure(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>New Tenure: {newTenure} months</Label>
          <Slider min={12} max={360} step={12} value={[newTenure]} onValueChange={(value) => setNewTenure(value[0])} />
        </div>
        <Button onClick={simulateRepayment} className="w-full">
          Simulate Repayment
        </Button>

        {simulationResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>EMI:</span>
                      <span className="font-medium">₹{simulationResult.currentEMI.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-medium">₹{simulationResult.currentTotalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure:</span>
                      <span className="font-medium">{currentTenure} months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>New Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>EMI:</span>
                      <span className="font-medium">₹{simulationResult.newEMI.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-medium">₹{simulationResult.newTotalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure:</span>
                      <span className="font-medium">{newTenure} months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Repayment Schedule Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    currentBalance: {
                      label: "Current Plan",
                      color: "hsl(var(--chart-1))",
                    },
                    newBalance: {
                      label: "New Plan",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationResult.currentSchedule.map((current, index) => ({
                        month: current.month,
                        currentBalance: current.balance,
                        newBalance: simulationResult.newSchedule[index]?.balance || 0,
                      }))}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Area
                        type="monotone"
                        dataKey="currentBalance"
                        stroke="var(--color-currentBalance)"
                        fill="var(--color-currentBalance)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="newBalance"
                        stroke="var(--color-newBalance)"
                        fill="var(--color-newBalance)"
                        fillOpacity={0.2}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current EMI</p>
                <p className="text-2xl font-bold">₹{simulationResult.currentEMI.toFixed(2)}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">New EMI</p>
                <p className="text-2xl font-bold">₹{simulationResult.newEMI.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

