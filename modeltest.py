
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#######import everything################################

import numpy as np
import pandas as pd
import _pickle as cPickle
from pyzillow.pyzillow import ZillowWrapper, GetDeepSearchResults

from pandas.io.json import json_normalize
import sys, json


#######Read data from stdin###############################
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines)

def main():
    #get our data as an array from read_in()
    lines = read_in()
    linear_reg = cPickle.load(open("reg_model.pkl", "rb"))
    
    address = json_normalize(lines['address'])
    city = json_normalize(lines['city'])
    state = json_normalize(lines['state'])
    zipcode = json_normalize(lines['zip'])
    bed = json_normalize(lines['bed'])
    bath = json_normalize(lines['bath'])
    SqFt = json_normalize(lines['sqft'])
    year = 1980 
    
    test_case = np.array([[bath, bed, SqFt, year, zipcode]])
    linear_reg.predict(test_case)
    prediction = linear_reg.predict(test_case)
    print_results = str(prediction)

    zillow_data = ZillowWrapper('X1-ZWz1gyajrkda8b_76gmj')
    deep_search_response = zillow_data.get_deep_search_results(address,zipcode)
    result = GetDeepSearchResults(deep_search_response)

    prediction = linear_reg.predict(test_case)
    print_results = str(prediction)

    return 'Your "fair market value: ', '$', print_results
    return 'Your Zestimate: ', '$', result.zestimate_amount

#start process
if __name__ == '__main__':

