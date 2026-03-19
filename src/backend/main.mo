import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type ApplicationId = Nat;

  type Application = {
    id : ApplicationId;
    name : Text;
    mobile : Text;
    address : Text;
  };

  module Application {
    public func compare(app1 : Application, app2 : Application) : Order.Order {
      Nat.compare(app1.id, app2.id);
    };
  };

  let applications = Map.empty<ApplicationId, Application>();
  var nextApplicationId = 1;

  public shared ({ caller }) func submitApplication(name : Text, mobile : Text, address : Text) : async ApplicationId {
    let application : Application = {
      id = nextApplicationId;
      name;
      mobile;
      address;
    };

    switch (applications.get(nextApplicationId)) {
      case (?_) {
        Runtime.trap("This application already exists.");
      };
      case (null) {
        applications.add(nextApplicationId, application);
        nextApplicationId += 1;
        application.id;
      };
    };
  };

  public query ({ caller }) func getAllApplications() : async [Application] {
    let array = applications.values().toArray();
    array.sort();
  };

  public query ({ caller }) func getApplicationById(id : ApplicationId) : async Application {
    switch (applications.get(id)) {
      case (?application) {
        application;
      };
      case (null) {
        Runtime.trap("Application does not exist.");
      };
    };
  };
};
