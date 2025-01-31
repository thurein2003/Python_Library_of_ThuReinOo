import datetime
times = datetime.datetime.now()

cus_time  ="{0:%I:%M:%S}".format(times)
print(cus_time)