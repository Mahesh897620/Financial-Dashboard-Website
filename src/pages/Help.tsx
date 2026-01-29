import { HelpCircle, Mail, MessageSquare, Book, Keyboard, ChevronDown } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/shared/GlassCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'How do I add a new transaction?',
    answer: 'Navigate to the Transactions page from the sidebar, then click the "Add Transaction" button. Fill in the details like amount, category, and date, then save.',
  },
  {
    question: 'How does the budget tracking work?',
    answer: 'The Budget page uses the 50/30/20 rule by default - 50% for needs, 30% for wants, and 20% for savings. You can customize these percentages based on your preferences.',
  },
  {
    question: 'Can I export my financial data?',
    answer: 'Yes! Go to the Reports page and click the "Export" button to download your data as a CSV file. You can choose the date range and categories to include.',
  },
  {
    question: 'How are the financial insights generated?',
    answer: 'Our AI analyzes your spending patterns, income, and financial goals to provide personalized recommendations and insights to help you manage your money better.',
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Absolutely. We use bank-level encryption to protect your data. Your information is never shared with third parties without your consent.',
  },
  {
    question: 'How do I set up recurring payments tracking?',
    answer: 'Go to the Dashboard and find the Recurring Payments widget. Click "Add Subscription" to add a new recurring payment. You can set the frequency, amount, and category.',
  },
];

const shortcuts = [
  { keys: ['⌘', 'K'], description: 'Open global search' },
  { keys: ['⌘', 'B'], description: 'Toggle sidebar' },
  { keys: ['⌘', 'T'], description: 'Toggle theme (dark/light)' },
  { keys: ['⌘', 'N'], description: 'New transaction' },
  { keys: ['⌘', ','], description: 'Open settings' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
];

const Help = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <HelpCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-muted-foreground">Find answers and get assistance</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Book className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Frequently Asked Questions</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Keyboard Shortcuts */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Keyboard className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Keyboard Shortcuts</h3>
              </div>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-2 py-1 text-xs font-mono bg-muted rounded border"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Contact Support */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Contact Support</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Live Chat
                </Button>
              </div>
            </GlassCard>

            {/* Documentation */}
            <GlassCard className="gradient-primary text-white">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm opacity-90 mb-4">
                Explore our comprehensive documentation for detailed guides and tutorials.
              </p>
              <Button variant="secondary" className="w-full">
                View Docs
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
