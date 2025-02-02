"use client"

import { useState } from "react"
import { UserProfileSetup } from "./UserProfileSetup"
import { LoanCard } from "./LoanCard"
import { type UserProfile, mockLoans, type Loan } from "@/utils/mockData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function getRecommendedLoans(profile: UserProfile): Loan[] {
  const { income, expenses, creditScore } = profile
  const monthlyDisposableIncome = income - expenses

  return mockLoans.filter((loan) => {
    const maxEMI = monthlyDisposableIncome * 0.4 // Assume max EMI is 40% of disposable income
    const emi =
      ((loan.interestRate / 12 / 100) * 1000000 * Math.pow(1 + loan.interestRate / 12 / 100, loan.tenure)) /
      (Math.pow(1 + loan.interestRate / 12 / 100, loan.tenure) - 1)

    return (
      emi <= maxEMI &&
      ((creditScore >= 750 && loan.interestRate <= 10) ||
        (creditScore >= 650 && loan.interestRate <= 12) ||
        (creditScore >= 550 && loan.interestRate <= 15))
    )
  })
}

export function PersonalizedRecommendations() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [recommendedLoans, setRecommendedLoans] = useState<Loan[]>([])

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile)
    setRecommendedLoans(getRecommendedLoans(profile))
  }

  return (
    <div className="space-y-8">
      {!userProfile ? (
        <Card>
          <CardHeader>
            <CardTitle>User Profile Setup</CardTitle>
            <CardDescription>
              Please provide your financial information to get personalized loan recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileSetup onProfileSubmit={handleProfileSubmit} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                  <dd className="text-2xl font-semibold">₹{userProfile.income}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Monthly Expenses</dt>
                  <dd className="text-2xl font-semibold">₹{userProfile.expenses}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Credit Score</dt>
                  <dd className="text-2xl font-semibold">{userProfile.creditScore}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Personalized Loan Recommendations</h2>
            <p className="text-gray-600">Based on your profile, here are some recommended loans:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} amount={1000000}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Application Process for {loan.type} Loan</DialogTitle>
                        <DialogDescription>
                          <p className="mb-4">Here's what you need to know before applying:</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Verify your personal and financial information</li>
                            <li>Prepare necessary documents (ID, income proof, bank statements)</li>
                            <li>Review the loan terms and conditions carefully</li>
                            <li>Consider your repayment capacity before proceeding</li>
                            <li>Check your credit score - it may affect your loan approval</li>
                            <li>Be prepared for a potential hard credit inquiry</li>
                            <li>The final loan offer may vary based on your application details</li>
                          </ul>
                          <div className="mt-6 space-y-4">
                            <h4 className="font-semibold">Required Documents:</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li>Valid government-issued ID (Aadhaar, PAN card, Passport)</li>
                              <li>Proof of income (Salary slips, ITR for last 2 years)</li>
                              <li>Bank statements for the last 6 months</li>
                              <li>Proof of address (Utility bills, Rental agreement)</li>
                              <li>Passport-size photographs</li>
                            </ul>
                            <p className="text-sm text-gray-600">
                              Note: Additional documents may be required based on the loan type and amount.
                            </p>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-semibold mb-2">Terms and Conditions:</h4>
                            <p className="text-sm text-gray-600">
                              By proceeding, you agree to our loan terms, including interest rates, repayment schedule,
                              and any applicable fees. You authorize us to verify your information and perform a credit
                              check. Early repayment options and charges may apply. Please read the full terms before
                              applying.
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <Label htmlFor="terms">I agree to the terms and conditions</Label>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => console.log("Proceeding with application")}>
                          Proceed with Application
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </LoanCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

