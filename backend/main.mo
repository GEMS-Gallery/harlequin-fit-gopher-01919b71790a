import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Nat "mo:base/Nat";

actor {
  // Define the TaxPayer type
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  stable var taxPayersEntries : [(Nat, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  var taxPayers = HashMap.HashMap<Nat, TaxPayer>(0, Nat.equal, Nat.hash);

  // Initialize the HashMap with stable data
  taxPayers := HashMap.fromIter<Nat, TaxPayer>(taxPayersEntries.vals(), 0, Nat.equal, Nat.hash);

  // Function to create a new TaxPayer record
  public func createTaxPayer(tid: Nat, firstName: Text, lastName: Text, address: Text) : async Result.Result<(), Text> {
    switch (taxPayers.get(tid)) {
      case (null) {
        let newTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, newTaxPayer);
        #ok(())
      };
      case (?_) {
        #err("TaxPayer with TID " # Nat.toText(tid) # " already exists")
      };
    }
  };

  // Function to get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Function to get a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Nat) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // Pre-upgrade hook to save the state
  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  // Post-upgrade hook to restore the state
  system func postupgrade() {
    taxPayers := HashMap.fromIter<Nat, TaxPayer>(taxPayersEntries.vals(), 0, Nat.equal, Nat.hash);
  };
}
