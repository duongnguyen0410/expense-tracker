import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import db from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon);
      setBudgetName(budgetInfo.name);
      setBudgetAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: budgetName,
        amount: budgetAmount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, budgetInfo.id));

    if (result) {
      refreshData();
      toast.success("Budget has been updated.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={!(budgetName && budgetAmount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full"
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
