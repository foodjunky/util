'use strict';

var _ = require('lodash');

function Enum(values) {

  var keys = [];
  var map = {};

  function add(id, name) {
    keys.push(id);
    map[id] = name;
  }

  if (values) {
    values.forEach(function(v) { add(v.id, v.name); });
  }

  return _.extend(map, {
    add: add,
    keys: function() { return keys; }
  });

}

module.exports = exports = {
  cardTypes: new Enum([
    { id: 'none', name: 'None' },
    { id: 'visa', name: 'VISA' },
    { id: 'masterCard', name: 'MasterCard' },
    { id: 'americanExpress', name: 'American Express' },
    { id: 'discover', name: 'Discover' },
    { id: 'dinersClub', name: 'Diners Club' },
    { id: 'jcb', name: 'JCB' },
    { id: 'laser', name: 'Laser' },
    { id: 'maestro', name: 'Maestro' }
  ]),
  cuisineTypes: new Enum([
    { id: 'African', name: 'African' },
    { id: 'American', name: 'American' },
    { id: 'Asian', name: 'Asian' },
    { id: 'Bakery', name: 'Bakery' },
    { id: 'Balkan', name: 'Balkan' },
    { id: 'BBQ', name: 'BBQ' },
    { id: 'Breakfast', name: 'Breakfast' },
    { id: 'British', name: 'British' },
    { id: 'Brunch', name: 'Brunch' },
    { id: 'Burgers', name: 'Burgers' },
    { id: 'Cafe', name: 'Cafe' },
    { id: 'Cantonese', name: 'Cantonese' },
    { id: 'Caribbean', name: 'Caribbean' },
    { id: 'Cheesesteaks', name: 'Cheesesteaks' },
    { id: 'Chicken', name: 'Chicken' },
    { id: 'Chinese', name: 'Chinese' },
    { id: 'Classic', name: 'Classic' },
    { id: 'Cuban', name: 'Cuban' },
    { id: 'Deli', name: 'Deli' },
    { id: 'Dessert', name: 'Dessert' },
    { id: 'Dim Sum', name: 'Dim Sum' },
    { id: 'English', name: 'English' },
    { id: 'Ethiopian', name: 'Ethiopian' },
    { id: 'Food Truck', name: 'Food Truck' },
    { id: 'French', name: 'French' },
    { id: 'Fresh Fruits', name: 'Fresh Fruits' },
    { id: 'Fusion', name: 'Fusion' },
    { id: 'Gluten-Free', name: 'Gluten-Free' },
    { id: 'Grinders', name: 'Grinders' },
    { id: 'Greek', name: 'Greek' },
    { id: 'Halal', name: 'Halal' },
    { id: 'Healthy', name: 'Healthy' },
    { id: 'Indian', name: 'Indian' },
    { id: 'Irish', name: 'Irish' },
    { id: 'Italian', name: 'Italian' },
    { id: 'Jamaican', name: 'Jamaican' },
    { id: 'Japanese', name: 'Japanese' },
    { id: 'Jewish', name: 'Jewish' },
    { id: 'Juice Bar', name: 'Juice Bar' },
    { id: 'Korean', name: 'Korean' },
    { id: 'Late Night', name: 'Late Night' },
    { id: 'Latin', name: 'Latin' },
    { id: 'Lebanese', name: 'Lebanese' },
    { id: 'Low Carb', name: 'Low Carb' },
    { id: 'Low Fat', name: 'Low Fat' },
    { id: 'Lunch Specials', name: 'Lunch Specials' },
    { id: 'Mandarin', name: 'Mandarin' },
    { id: 'Mediterranean', name: 'Mediterranean' },
    { id: 'Mexican', name: 'Mexican' },
    { id: 'Middle Eastern', name: 'Middle Eastern' },
    { id: 'Moroccan', name: 'Moroccan' },
    { id: 'Noodles', name: 'Noodles' },
    { id: 'Organic', name: 'Organic' },
    { id: 'Pakistani', name: 'Pakistani' },
    { id: 'Peruvian', name: 'Peruvian' },
    { id: 'Pizza', name: 'Pizza' },
    { id: 'Polish', name: 'Polish' },
    { id: 'Puerto Rican', name: 'Puerto Rican' },
    { id: 'Salads', name: 'Salads' },
    { id: 'Sandwiches', name: 'Sandwiches' },
    { id: 'Seafood', name: 'Seafood' },
    { id: 'Smoothies', name: 'Smoothies' },
    { id: 'Soul Food', name: 'Soul Food' },
    { id: 'Soup', name: 'Soup' },
    { id: 'Southern', name: 'Southern' },
    { id: 'Steakhouse', name: 'Steakhouse' },
    { id: 'Subs', name: 'Subs' },
    { id: 'Sushi', name: 'Sushi' },
    { id: 'Swedish', name: 'Swedish' },
    { id: 'Szechwan', name: 'Szechwan' },
    { id: 'Tapas', name: 'Tapas' },
    { id: 'Thai', name: 'Thai' },
    { id: 'Vegan', name: 'Vegan' },
    { id: 'Vegetarian', name: 'Vegetarian' },
    { id: 'Venezuelan', name: 'Venezuelan' },
    { id: 'Vietnamese', name: 'Vietnamese' },
    { id: 'Wings', name: 'Wings' }
  ]),
  day: new Enum([
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' }
  ]),
  deliveryTypes: new Enum([
    { id: 'unknown', name: 'unknown' },
    { id: 'delivery', name: 'delivery' },
    { id: 'pickup', name: 'pickup' }
  ]),
  eventTopics: new Enum([
    { id: 'event.orders.order.started', name: 'Order Started' },
    { id: 'event.orders.order.updated', name: 'Order Updated' },
    { id: 'event.orders.order.submitted', name: 'Order Submitted' },
    { id: 'event.orders.order.authorized', name: 'Order Payment Authorized' },
    { id: 'event.orders.order.declined', name: 'Order Payment Declined' },
    { id: 'event.orders.order.invoiced', name: 'Order Invoiced' },
    { id: 'event.orders.order.confirmed', name: 'Order Confirmed' },
    { id: 'event.orders.order.settled', name: 'Order Settled' },
    { id: 'event.orders.order.enroute', name: 'Order In Transit' },
    { id: 'event.orders.order.fulfilled', name: 'Order Fulfilled' },
    { id: 'event.orders.order.canceled', name: 'Order Canceled' },
    { id: 'event.orders.order.error', name: 'Order Error' },
    { id: 'event.orders.order.reminder', name: 'Order Reminder' },
    { id: 'event.orders.order.survey', name: 'Order Survey' },
    { id: 'event.orders.part.added', name: 'Diner Added' },
    { id: 'event.orders.part.submitted', name: 'Diner Submitted' },
    { id: 'event.orders.part.removed', name: 'Diner Removed' },
    { id: 'event.orders.part.reminder', name: 'Diner Reminder' },
    { id: 'event.orders.order.transmit', name: 'Ready to Transmit' },
    { id: 'event.orders.order.batchTransmit', name: 'Ready to Transmit (batch)' },
    { id: 'event.orders.order.confirm', name: 'Ready to Confirm' },
    { id: 'event.orders.order.batchVerify', name: 'Ready to Verify (batch)' },
    { id: 'event.orders.order.invite', name: 'Recurring Order Invite' },
    { id: 'event.restaurants.onboarding.verify-email', name: 'Restaurant Onboarding Email' },
    { id: 'event.restaurants.onboarding.verify-fax', name: 'Restaurant Onboarding Fax' },
    { id: 'event.restaurants.onboarding.approved', name: 'Restaurant Onboarding Approved' },
    { id: 'event.restaurants.onboarding.rejected', name: 'Restaurant Onboarding Rejected' },
    { id: 'event.restaurants.onboarding.claim', name: 'Restaurant Claim Request' },
    { id: 'event.restaurants.onboarding.claim-approved', name: 'Restaurant Claim Approved' },
    { id: 'event.restaurants.onboarding.claim-rejected', name: 'Restaurant Claim Rejected' },
    { id: 'event.remittance.vcn.settled', name: 'VCN Settlement Report' },
    { id: 'event.remittance.vcn.error', name: 'VCN Reconciliation Error' },
    // Deprecated
    { id: 'event.vcn.reconciliation.settled', name: 'VCN Settlement' },
    { id: 'event.vcn.reconciliation.error', name: 'VCN Reconciliation Error' },
    { id: 'messages.restaurant.claim', name: 'Restaurant Claimed (old)' },
    { id: 'messages.change.restaurant.claim', name: 'Restaurant Claim Reviewed' }
  ]),
  eventFilters: new Enum([
    { id: 'groupOrder', name: 'Group Orders' },
    { id: 'individualOrder', name: 'Individual Orders' },
    { id: 'cateringOrder', name: 'Catering Orders' },
    //{ id: 'orderTimeChanged', name: 'Order Time Changed' }
  ]),
  notificationChannels: new Enum([
    { id: 'none', name: 'None' },
    { id: 'auto', name: 'Auto Acknowledge' },
    { id: 'phone', name: 'Phone Call' },
    { id: 'fax', name: 'Fax' },
    { id: 'ivr', name: 'Automated Call' },
    { id: 'email', name: 'Email' },
    { id: 'http', name: 'HTTP' },
    { id: 'sms', name: 'SMS' },
    { id: 'gcm', name: 'Android App' },
    { id: 'apns', name: 'iOS App' },
    { id: 'custom', name: 'Custom Module' }
  ]),
  notificationDispatchers: new Enum([
    { id: 'custom', name: 'Custom Recipients' },
    { id: 'orderDeliverer', name: 'Order Deliverer' },
    { id: 'orderDiners', name: 'Order Diners' },
    { id: 'orderEaters', name: 'Order Eaters' },
    { id: 'orderNonEaters', name: 'Order Non-Eaters' },
    { id: 'orderOrganizer', name: 'Order Organizer' },
    { id: 'orderConfirmer', name: 'Order Confirmer' },
    { id: 'orderPreparer', name: 'Order Preparer' },
    { id: 'orderPreparerBatch', name: 'Order Preparer (daily batch)' },
    { id: 'orderDeliverer', name: 'Order Deliverer' },
    { id: 'orderOperations', name: 'Order Operations' },
    { id: 'orderBatchInvites', name: 'Recurring Order Invitees' },
    { id: 'operations', name: 'General Operations' },
    { id: 'restaurantClaimContact', name: 'Restaurant Claim Contact' },
    { id: 'restaurantContactAll', name: 'Restaurant Contacts (all)' }
  ]),
  mfaTypes: new Enum([
    { id: 'app', name: 'Mobile app' },
    { id: 'sms', name: 'SMS message' }
  ]),
  orderConfirmationTypes: new Enum([
    { id: 'phone', name: 'Phone Call' },
    { id: 'ivr', name: 'Automated Call' },
    { id: 'auto', name: 'Auto-Confirm' }
  ]),
  orderReceiptTypes: new Enum([
    { id: 'email', name: 'Email' },
    { id: 'sms', name: 'SMS' },
    { id: 'fax', name: 'Fax' }
  ]),
  orderVerifyTypes: new Enum([
    { id: 'email', name: 'Email' },
    { id: 'sms', name: 'SMS' },
    { id: 'fax', name: 'Fax' },
    //{ id: 'ivr', name: 'Automated Call' },
    { id: 'phone', name: 'Phone Call' },
    //{ id: 'auto', name: 'Auto-Verify' }
  ]),
  orderStatus: new Enum([
    // Order processing
    { id: 'new', name: 'New' },
    { id: 'active', name: 'Active' },
    { id: 'submitted', name: 'Submitted' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'ready', name: 'Ready for Pickup' },
    { id: 'enroute', name: 'Out for Delivery' },
    { id: 'fulfilled', name: 'Fulfilled' },
    // Permanent failures
    { id: 'canceled', name: 'Canceled' }, // By user
    { id: 'rejected', name: 'Rejected' }, // By restaurant
    { id: 'abandoned', name: 'Abandoned' }
  ]),
  orderTypes: new Enum([
    { id: 'unknown', name: 'Unknown' },
    { id: 'individual', name: 'Individual' },
    { id: 'group', name: 'Group' },
    { id: 'catering', name: 'Catering' }
  ]),
  discountSources: new Enum([
    { id: 'customer', name: 'Customer' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'promotion', name: 'promotion' },
    { id: 'creditMemo', name: 'Credit' }
  ]),
  discountApply: new Enum([
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'fee', name: 'Service Fee' }
  ]),
  // Order transactions (not to be confused with a single payment transaction/type)
  transactionType: new Enum([
    { id: 'charge', name: 'Charge' },
    { id: 'remittance', name: 'Remittance' }
  ]),
  // This needs to be renamed to paymentMethods to avoid confusion
  paymentTypes: new Enum([
    { id: 'unknown', name: 'Unknown' },
    // credit/nonce are "in-flight" payment types that will be
    // converted to vault immediately
    { id: 'credit', name: 'Credit Card' },
    { id: 'nonce', name: 'Credit Card' },
    { id: 'vault', name: 'Credit Card' },
    { id: 'comp', name: 'foodjunky Comp' },
    { id: 'cash', name: 'Cash' },
    { id: 'eft', name: 'EFT' },
    { id: 'invoice', name: 'Invoice' },
    { id: 'vcn', name: 'Virtual Card' },
    { id: 'corporate', name: 'foodjunky Corporate Card' },
    { id: 'yelp', name: 'Yelp'}
  ]),
  paymentType: new Enum([
    { id: 'charge', name: 'Charge' },
    { id: 'refund', name: 'Refund' },
    { id: 'credit', name: 'Credit' }
  ]),
  paymentStatus: new Enum([
    { id: 'pending', name: 'Pending' },
    { id: 'requisitioned', name: 'Requisitioned' },
    { id: 'authorized', name: 'Authorized' },
    { id: 'expired', name: 'Authorization expired' },
    { id: 'declined', name: 'Declined' },
    { id: 'settling', name: 'Submitted for settlement' },
    { id: 'settled', name: 'Settled' },
    { id: 'void', name: 'Voided' },
    { id: 'error', name: 'Error' },
    // DON'T USE THIS, use settled instead for refund transactions
    { id: 'refunded', name: 'Refunded' }
  ]),
  activityStatus: new Enum([
    { id: 'pending', name: 'Pending' },
    { id: 'active', name: 'Active' },
    { id: 'review', name: 'In Review' },
    { id: 'completed', name: 'Completed' }
  ]),
  workflowStatus: new Enum([
    { id: 'pending', name: 'Pending' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' }
  ]),
  workflowResolution: new Enum([
    { id: 'success', name: 'Success' },
    { id: 'error', name: 'Error' },
    { id: 'cancel', name: 'Cancel' }
  ]),
  processStages: new Enum([
    { id: 'unknown', name: 'Unknown' },
    { id: 'submission', name: 'Submission' },
    { id: 'payment', name: 'Payment' },
    { id: 'remittance', name: 'Remittance' },
    { id: 'dispatch', name: 'Dispatch' },
    { id: 'confirmation', name: 'Confirmation' },
    { id: 'preparation', name: 'Preparation' },
    { id: 'fulfillment', name: 'Fulfillment' }
  ]),
  processStatus: new Enum([
    { id: 'unknown', name: 'Unknown' },
    { id: 'pending', name: 'Pending' },
    { id: 'success', name: 'Success' },
    { id: 'error', name: 'Error' }
  ]),
  processTypes: new Enum([
    { id: 'faxDispatch', name: 'Fax Dispatch' },
    { id: 'emailDispatch', name: 'Email Dispatch' },
    { id: 'smsDispatch', name: 'SMS Dispatch' },
    { id: 'ivrConfirm', name: 'IVR Confirmation' },
    { id: 'cardCharge', name: 'Card Charge' },
    { id: 'manualConfirm', name: 'Manual Confirmation' },
    { id: 'autoConfirm', name: 'Auto Confirmation' },
    { id: 'smsConfirm', name: 'SMS Confirmation' },
    { id: 'unknown', name: 'unknown' }
  ]),
  requestState: new Enum([
    { id: 'open', name: 'Open' },
    { id: 'assigned', name: 'Assigned' },
    { id: 'submitted', name: 'Submitted for Review' },
    { id: 'review', name: 'In Review' },
    { id: 'completed', name: 'Completed' },
    { id: 'rejected', name: 'Rejected' }
  ]),
  // Backwards compat
  requestStatus: new Enum([
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'rejected', name: 'Rejected' }
  ]),
  // End
  reviewStatus: new Enum([
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'rejected', name: 'Rejected' }
  ]),
	requestRoles: new Enum([
    { id: 'owner', name: 'Owner' },
    { id: 'reviewer', name: 'Reviewer' },
    { id: 'worker', name: 'Worker' },
    { id: 'trusted', name: 'Trusted Worker' }
  ]),
  requestTypes: new Enum([
    { id: 'menu.update', name: 'Menu Update' },
    { id: 'restaurant.update', name: 'Restaurant Update' },
    { id: 'restaurant.claim', name: 'Restaurant Claim' },
    { id: 'restaurant.restricted', name: 'Restaurant Approval' },
    { id: 'restaurant.request', name: 'Restaurant Request' }
  ]),
  states: new Enum([
    { id: 'AL', name: 'Alabama' },
    { id: 'AK', name: 'Alaska' },
    { id: 'AS', name: 'American Samoa' },
    { id: 'AZ', name: 'Arizona' },
    { id: 'AR', name: 'Arkansas' },
    { id: 'CA', name: 'California' },
    { id: 'CO', name: 'Colorado' },
    { id: 'CT', name: 'Connecticut' },
    { id: 'DE', name: 'Delaware' },
    { id: 'DC', name: 'District Of Columbia' },
    { id: 'FM', name: 'Federated States Of Micronesia' },
    { id: 'FL', name: 'Florida' },
    { id: 'GA', name: 'Georgia' },
    { id: 'GU', name: 'Guam' },
    { id: 'HI', name: 'Hawaii' },
    { id: 'ID', name: 'Idaho' },
    { id: 'IL', name: 'Illinois' },
    { id: 'IN', name: 'Indiana' },
    { id: 'IA', name: 'Iowa' },
    { id: 'KS', name: 'Kansas' },
    { id: 'KY', name: 'Kentucky' },
    { id: 'LA', name: 'Louisiana' },
    { id: 'ME', name: 'Maine' },
    { id: 'MH', name: 'Marshall Islands' },
    { id: 'MD', name: 'Maryland' },
    { id: 'MA', name: 'Massachusetts' },
    { id: 'MI', name: 'Michigan' },
    { id: 'MN', name: 'Minnesota' },
    { id: 'MS', name: 'Mississippi' },
    { id: 'MO', name: 'Missouri' },
    { id: 'MT', name: 'Montana' },
    { id: 'NE', name: 'Nebraska' },
    { id: 'NV', name: 'Nevada' },
    { id: 'NH', name: 'New Hampshire' },
    { id: 'NJ', name: 'New Jersey' },
    { id: 'NM', name: 'New Mexico' },
    { id: 'NY', name: 'New York' },
    { id: 'NC', name: 'North Carolina' },
    { id: 'ND', name: 'North Dakota' },
    { id: 'MP', name: 'Northern Mariana Islands' },
    { id: 'OH', name: 'Ohio' },
    { id: 'OK', name: 'Oklahoma' },
    { id: 'OR', name: 'Oregon' },
    { id: 'PW', name: 'Palau' },
    { id: 'PA', name: 'Pennsylvania' },
    { id: 'PR', name: 'Puerto Rico' },
    { id: 'RI', name: 'Rhode Island' },
    { id: 'SC', name: 'South Carolina' },
    { id: 'SD', name: 'South Dakota' },
    { id: 'TN', name: 'Tennessee' },
    { id: 'TX', name: 'Texas' },
    { id: 'UT', name: 'Utah' },
    { id: 'VT', name: 'Vermont' },
    { id: 'VI', name: 'Virgin Islands' },
    { id: 'VA', name: 'Virginia' },
    { id: 'WA', name: 'Washington' },
    { id: 'WV', name: 'West Virginia' },
    { id: 'WI', name: 'Wisconsin' },
    { id: 'WY', name: 'Wyoming' }
  ])
};
